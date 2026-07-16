import { NextRequest, NextResponse } from "next/server";
import { saveParticipantRequest } from "@/lib/participant-db";
import {
  sendInternalPreenchimentoEmail,
  sendParticipantReceivedEmail,
} from "@/lib/participant-messaging";

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

    const sentByEmail = await sendInternalPreenchimentoEmail({ ...data, request: savedRequest });
    if (sentByEmail) {
      await sendParticipantReceivedEmail({ nome: data.nome, email: data.email });
    }

    return NextResponse.json(
      {
        message: sentByEmail
          ? savedRequest
            ? "Preenchimento salvo no banco e enviado com sucesso para a equipe do Cafe com Zakia."
            : "Preenchimento enviado com sucesso para a equipe do Cafe com Zakia."
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
