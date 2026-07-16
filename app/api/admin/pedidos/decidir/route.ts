import { NextRequest, NextResponse } from "next/server";
import {
  ParticipantRequestStatus,
  updateParticipantRequestStatusByToken,
} from "@/lib/participant-db";
import { sendParticipantApprovedEmail, sendParticipantDeniedEmail } from "@/lib/participant-messaging";

export const runtime = "nodejs";

function isStatus(value: string | null): value is ParticipantRequestStatus {
  return value === "aprovado" || value === "reprovado";
}

function htmlResponse(title: string, message: string) {
  return new NextResponse(
    `<!doctype html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${title}</title>
        <style>
          body{margin:0;min-height:100vh;display:grid;place-items:center;background:#050505;color:#fff;font-family:Arial,sans-serif}
          main{width:min(720px,calc(100% - 32px));border:1px solid rgba(255,226,138,.34);background:#111;padding:36px;border-radius:10px;box-shadow:0 24px 80px rgba(0,0,0,.5)}
          h1{margin:0 0 14px;color:#ffe79a;font-size:34px}
          p{line-height:1.65;color:rgba(255,255,255,.82)}
          a{display:inline-block;margin-top:18px;background:#d4af37;color:#070707;font-weight:900;padding:14px 18px;border-radius:6px;text-decoration:none}
        </style>
      </head>
      <body>
        <main>
          <h1>${title}</h1>
          <p>${message}</p>
          <a href="/jogos/pedidos">Voltar para pedidos</a>
        </main>
      </body>
    </html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } },
  );
}

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  const token = request.nextUrl.searchParams.get("token");
  const action = request.nextUrl.searchParams.get("action");

  if (!id || !token || !isStatus(action)) {
    return htmlResponse("Link invalido", "Nao foi possivel validar este pedido.");
  }

  const item = await updateParticipantRequestStatusByToken(id, token, action);
  if (!item) {
    return htmlResponse("Pedido nao encontrado", "Este link pode estar incorreto ou o pedido pode ter sido excluido.");
  }

  if (action === "aprovado") {
    try {
      await sendParticipantApprovedEmail(item);
    } catch (error) {
      console.error("participant approved email error", error);
      return htmlResponse(
        "Participante aprovado",
        "O pedido foi aprovado no banco. O e-mail automatico para o participante foi bloqueado pelo provedor de e-mail; verifique a configuracao do dominio no Resend.",
      );
    }
    return htmlResponse(
      "Participante aprovado",
      "O pedido foi aprovado e o participante recebeu um e-mail de parabens com o botao para assinar o ACEITO PARTICIPAR DO PROGRAMA !",
    );
  }

  try {
    await sendParticipantDeniedEmail(item);
  } catch (error) {
    console.error("participant denied email error", error);
    return htmlResponse(
      "Participante reprovado",
      "O pedido foi reprovado no banco. O e-mail automatico para o participante foi bloqueado pelo provedor de e-mail; verifique a configuracao do dominio no Resend.",
    );
  }
  return htmlResponse(
    "Participante reprovado",
    "O pedido foi reprovado e o participante recebeu um e-mail informando a decisao da curadoria.",
  );
}
