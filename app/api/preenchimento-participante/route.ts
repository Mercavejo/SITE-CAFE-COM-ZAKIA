import { NextRequest, NextResponse } from "next/server";
import { saveParticipantRequest } from "@/lib/participant-db";

export const runtime = "nodejs";

type PublicSubmissionPayload = {
  nome?: string;
  email?: string;
  whatsapp?: string;
  redeSocial?: string;
  links?: string;
  resumo?: string;
  objetivo?: string;
  temas?: string;
  temasProibidos?: string;
  perguntasDesejadas?: string;
  observacoes?: string;
  enviadoEm?: string;
  importLink?: string;
  empresa?: string;
};

const destinationEmail = process.env.PARTICIPACAO_EMAIL_TO || "cafecomzakia@gmail.com";
const fromEmail =
  process.env.PARTICIPACAO_EMAIL_FROM || "Cafe com Zakia <onboarding@resend.dev>";

function cleanText(value: unknown, maxLength = 1200) {
  return String(value || "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function validatePayload(payload: PublicSubmissionPayload) {
  if (cleanText(payload.empresa, 100)) {
    throw new Error("Envio bloqueado por verificacao de seguranca.");
  }

  const data = {
    nome: cleanText(payload.nome, 160),
    email: cleanText(payload.email, 180).toLowerCase(),
    whatsapp: onlyDigits(cleanText(payload.whatsapp, 24)),
    redeSocial: cleanText(payload.redeSocial, 180),
    links: cleanText(payload.links),
    resumo: cleanText(payload.resumo),
    objetivo: cleanText(payload.objetivo),
    temas: cleanText(payload.temas),
    temasProibidos: cleanText(payload.temasProibidos),
    perguntasDesejadas: cleanText(payload.perguntasDesejadas),
    observacoes: cleanText(payload.observacoes),
    enviadoEm: cleanText(payload.enviadoEm, 80) || new Date().toISOString(),
    importLink: cleanText(payload.importLink, 4000),
  };

  if (data.nome.length < 5 || !data.nome.includes(" ")) {
    throw new Error("Informe o nome completo.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    throw new Error("Informe um e-mail valido.");
  }

  if (data.whatsapp.length < 10) {
    throw new Error("Informe um WhatsApp valido.");
  }

  if (data.redeSocial.length < 2) {
    throw new Error("Informe a rede social mais usada.");
  }

  if (!data.importLink.startsWith("https://www.cafecomzakia.com.br/jogos/sorteio?preenchimento=")) {
    throw new Error("Link de importacao invalido.");
  }

  return data;
}

async function sendPreenchimentoEmail(data: ReturnType<typeof validatePayload>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [destinationEmail],
      subject: `PREENCHIMENTO DO PARTICIPANTE - ${data.nome}`,
      html: `
        <h2>Novo preenchimento do participante</h2>
        <p><strong>Status:</strong> analisar se sera aprovado para a etapa ACEITO PARTICIPAR DO PROGRAMA.</p>
        <p><strong>Nome:</strong> ${escapeHtml(data.nome)}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>WhatsApp:</strong> ${escapeHtml(data.whatsapp)}</p>
        <p><strong>Rede social:</strong> ${escapeHtml(data.redeSocial)}</p>
        <p><strong>Enviado em:</strong> ${escapeHtml(data.enviadoEm)}</p>
        <hr />
        <p><strong>Link para importar no Sorteio de Perguntas:</strong></p>
        <p><a href="${escapeHtml(data.importLink)}">${escapeHtml(data.importLink)}</a></p>
        <hr />
        <p><strong>Links informados:</strong><br />${escapeHtml(data.links || "Nao informado")}</p>
        <p><strong>Resumo:</strong><br />${escapeHtml(data.resumo || "Nao informado")}</p>
        <p><strong>Objetivo:</strong><br />${escapeHtml(data.objetivo || "Nao informado")}</p>
        <p><strong>Temas principais:</strong><br />${escapeHtml(data.temas || "Nao informado")}</p>
        <p><strong>Temas delicados/proibidos:</strong><br />${escapeHtml(data.temasProibidos || "Nao informado")}</p>
        <p><strong>Perguntas ou assuntos desejados:</strong><br />${escapeHtml(data.perguntasDesejadas || "Nao informado")}</p>
        <p><strong>Observacoes:</strong><br />${escapeHtml(data.observacoes || "Nao informado")}</p>
      `,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Falha no envio de e-mail: ${errorText.slice(0, 240)}`);
  }

  return true;
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as PublicSubmissionPayload;
    const data = validatePayload(payload);
    let savedRequest: Awaited<ReturnType<typeof saveParticipantRequest>> = null;
    let databaseError = "";

    try {
      savedRequest = await saveParticipantRequest({
        name: data.nome,
        email: data.email,
        whatsapp: data.whatsapp,
        social: data.redeSocial,
        payload: data,
        importLink: data.importLink,
      });
    } catch (error) {
      databaseError = error instanceof Error ? error.message : "Falha ao salvar no banco.";
      console.error("participant request database error", error);
    }

    const sentByEmail = await sendPreenchimentoEmail(data);

    return NextResponse.json(
      {
        message: sentByEmail
          ? savedRequest
            ? "Preenchimento salvo no banco e enviado com sucesso para a equipe do Cafe com Zakia."
            : databaseError
              ? `Preenchimento enviado por e-mail, mas nao foi salvo no banco: ${databaseError}`
              : "Preenchimento enviado com sucesso por e-mail. O banco sera ativado quando DATABASE_URL estiver configurado."
          : "Preenchimento gerado. O envio por e-mail sera ativado quando a chave RESEND_API_KEY estiver configurada.",
        sentByEmail,
        databaseSaved: Boolean(savedRequest),
        requestId: savedRequest?.id || null,
        databaseError: databaseError || null,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Nao foi possivel enviar o preenchimento.";
    return NextResponse.json(
      { message },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }
}
