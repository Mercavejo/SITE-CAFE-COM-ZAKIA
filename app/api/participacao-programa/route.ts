import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { saveParticipantDocument } from "@/lib/participant-db";

export const runtime = "nodejs";

type ParticipationPayload = {
  nomeCompleto?: string;
  cpf?: string;
  email?: string;
  whatsapp?: string;
  redeSocial?: string;
  assinatura?: string;
  aceitePrograma?: boolean;
  aceiteImagem?: boolean;
  empresa?: string;
};

const destinationEmail = process.env.PARTICIPACAO_EMAIL_TO || "cafecomzakia@gmail.com";
const fromEmail =
  process.env.PARTICIPACAO_EMAIL_FROM || "Café com Zákia <onboarding@resend.dev>";

function cleanText(value: unknown, maxLength = 300) {
  return String(value || "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function normalizeName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function validatePayload(payload: ParticipationPayload) {
  const nomeCompleto = cleanText(payload.nomeCompleto, 160);
  const assinatura = cleanText(payload.assinatura, 160);
  const cpf = cleanText(payload.cpf, 18);
  const email = cleanText(payload.email, 180).toLowerCase();
  const whatsapp = cleanText(payload.whatsapp, 18);
  const redeSocial = cleanText(payload.redeSocial, 180);

  if (cleanText(payload.empresa, 100)) {
    throw new Error("Envio bloqueado por verificacao de seguranca.");
  }

  if (nomeCompleto.length < 8 || !nomeCompleto.includes(" ")) {
    throw new Error("Informe o nome completo.");
  }

  if (onlyDigits(cpf).length !== 11) {
    throw new Error("Informe um CPF valido com 11 digitos.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Informe um e-mail valido.");
  }

  if (onlyDigits(whatsapp).length < 10) {
    throw new Error("Informe um WhatsApp valido.");
  }

  if (redeSocial.length < 2) {
    throw new Error("Informe a rede social mais usada.");
  }

  if (normalizeName(nomeCompleto) !== normalizeName(assinatura)) {
    throw new Error("A assinatura precisa repetir o nome completo.");
  }

  if (!payload.aceitePrograma || !payload.aceiteImagem) {
    throw new Error("As confirmações obrigatórias precisam estar assinaladas.");
  }

  return { nomeCompleto, cpf, email, whatsapp, redeSocial, assinatura };
}

function splitText(text: string, maxChars = 92) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const next = `${line} ${word}`.trim();
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }

  if (line) lines.push(line);
  return lines;
}

async function createParticipationPdf(data: ReturnType<typeof validatePayload>) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595.28, 841.89]);
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const gold = rgb(0.72, 0.55, 0.16);
  const black = rgb(0.06, 0.06, 0.06);
  const gray = rgb(0.28, 0.28, 0.28);

  let y = 790;
  const left = 52;
  const width = 490;
  const now = new Date();

  page.drawRectangle({ x: 0, y: 0, width: 595.28, height: 841.89, color: rgb(0.98, 0.98, 0.96) });
  page.drawRectangle({ x: 34, y: 34, width: 527.28, height: 773.89, borderColor: gold, borderWidth: 1.2 });
  page.drawText("CAFÉ COM ZÁKIA", { x: left, y, size: 12, font: bold, color: gold });
  y -= 34;
  page.drawText("ACEITO PARTICIPAR DO PROGRAMA !", { x: left, y, size: 22, font: bold, color: black });
  y -= 24;
  page.drawText("Documento de confirmação voluntária de participação", {
    x: left,
    y,
    size: 11,
    font: regular,
    color: gray,
  });

  y -= 34;
  const fields = [
    ["Nome completo", data.nomeCompleto],
    ["CPF", data.cpf],
    ["E-mail", data.email],
    ["WhatsApp", data.whatsapp],
    ["Rede social mais usada", data.redeSocial],
    ["Data e hora do aceite", now.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })],
  ];

  for (const [label, value] of fields) {
    page.drawText(`${label}:`, { x: left, y, size: 10.5, font: bold, color: black });
    page.drawText(value, { x: left + 150, y, size: 10.5, font: regular, color: black });
    y -= 22;
  }

  y -= 10;
  const paragraphs = [
    "Declaro que fui selecionado(a) para participar do programa Café com Zákia e que minha participação ocorre por livre vontade.",
    "Declaro estar ciente de que responderei apenas o que desejar durante a entrevista, sem obrigação de responder perguntas que considere inadequadas, pessoais ou sensíveis.",
    "Autorizo a captação, gravação, edição e publicação da minha imagem, voz e participação em formatos de podcast, vídeo, cortes, redes sociais, plataformas digitais e materiais institucionais vinculados ao Café com Zákia.",
    "Estou ciente de que eventual pedido de retirada, ajuste ou cancelamento de trecho específico poderá ser encaminhado para análise conjunta entre participante e equipe do programa, considerando contexto editorial, técnico e jurídico.",
    "Os dados pessoais informados neste documento serão usados para identificação, contato, emissão e arquivo desta autorização, com acesso restrito à equipe responsável.",
  ];

  for (const paragraph of paragraphs) {
    for (const line of splitText(paragraph)) {
      page.drawText(line, { x: left, y, size: 10.5, font: regular, color: black });
      y -= 15;
    }
    y -= 8;
  }

  y -= 6;
  page.drawText("Confirmações assinaladas:", { x: left, y, size: 11, font: bold, color: black });
  y -= 20;
  const confirmations = [
    "ACEITO PARTICIPAR DO PROGRAMA !",
    "Autorizo gravação, edição e publicação de imagem e voz.",
  ];
  for (const confirmation of confirmations) {
    page.drawText("[X]", { x: left, y, size: 11, font: bold, color: gold });
    page.drawText(confirmation, { x: left + 28, y, size: 10.5, font: regular, color: black });
    y -= 18;
  }

  y -= 18;
  page.drawText("Assinatura digital:", { x: left, y, size: 11, font: bold, color: black });
  y -= 28;
  page.drawLine({ start: { x: left, y }, end: { x: left + width, y }, thickness: 0.8, color: gray });
  y -= 18;
  page.drawText(data.assinatura, { x: left, y, size: 12, font: bold, color: black });

  page.drawText("Documento gerado automaticamente pelo site cafecomzakia.com.br", {
    x: left,
    y: 58,
    size: 8.5,
    font: regular,
    color: gray,
  });

  const bytes = await pdf.save();
  return Buffer.from(bytes).toString("base64");
}

async function sendEmail(pdfBase64: string, data: ReturnType<typeof validatePayload>, filename: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return false;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [destinationEmail],
      subject: `ACEITO PARTICIPAR DO PROGRAMA - ${data.nomeCompleto}`,
      html: `
        <h2>Novo aceite de participação</h2>
        <p><strong>Nome:</strong> ${data.nomeCompleto}</p>
        <p><strong>E-mail:</strong> ${data.email}</p>
        <p><strong>WhatsApp:</strong> ${data.whatsapp}</p>
        <p><strong>Rede social:</strong> ${data.redeSocial}</p>
        <p>O PDF assinado digitalmente está anexado a este e-mail.</p>
      `,
      attachments: [
        {
          filename,
          content: pdfBase64,
        },
      ],
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
    const payload = (await request.json()) as ParticipationPayload;
    const data = validatePayload(payload);
    const pdfBase64 = await createParticipationPdf(data);
    const filename = `aceite-cafe-com-zakia-${onlyDigits(data.cpf)}.pdf`;
    let savedDocument: Awaited<ReturnType<typeof saveParticipantDocument>> = null;
    let databaseError = "";

    try {
      savedDocument = await saveParticipantDocument({
        name: data.nomeCompleto,
        email: data.email,
        whatsapp: data.whatsapp,
        social: data.redeSocial,
        cpfLast4: onlyDigits(data.cpf).slice(-4),
        payload: data,
        pdfBase64,
        pdfFilename: filename,
      });
    } catch (error) {
      databaseError = error instanceof Error ? error.message : "Falha ao salvar documento no banco.";
      console.error("participant document database error", error);
    }

    const sentByEmail = await sendEmail(pdfBase64, data, filename);

    if (!sentByEmail) {
      return NextResponse.json(
        {
          message:
            "Documento gerado com sucesso. O PDF foi baixado neste aparelho. O envio automático por e-mail será ativado quando a chave de e-mail estiver configurada.",
          pdfBase64,
          filename,
          databaseSaved: Boolean(savedDocument),
          documentId: savedDocument?.id || null,
          databaseError: databaseError || null,
        },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    return NextResponse.json(
      {
        message: savedDocument
          ? "Documento assinado, salvo no banco e enviado com sucesso para cafecomzakia@gmail.com."
          : "Documento assinado e enviado com sucesso para cafecomzakia@gmail.com.",
        databaseSaved: Boolean(savedDocument),
        documentId: savedDocument?.id || null,
        databaseError: databaseError || null,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Nao foi possivel processar o aceite.";
    return NextResponse.json(
      { message },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }
}
