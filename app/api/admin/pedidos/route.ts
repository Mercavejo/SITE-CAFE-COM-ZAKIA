import { NextRequest, NextResponse } from "next/server";
import {
  deleteParticipantRequest,
  listParticipantRequests,
  ParticipantRequestStatus,
  updateParticipantRequestStatus,
} from "@/lib/participant-db";
import { sendParticipantApprovedEmail, sendParticipantDeniedEmail } from "@/lib/participant-messaging";

export const runtime = "nodejs";

function hasAdminAccess(request: NextRequest) {
  return (
    request.cookies.get("jogos_access")?.value === "5832" ||
    request.cookies.get("carfuk_access")?.value === "5832"
  );
}

function isStatus(value: unknown): value is ParticipantRequestStatus {
  return value === "novo" || value === "aprovado" || value === "reprovado";
}

export async function GET(request: NextRequest) {
  if (!hasAdminAccess(request)) {
    return NextResponse.json(
      { message: "Acesso protegido." },
      { status: 403, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const items = await listParticipantRequests();
    if (!items) {
      return NextResponse.json(
        {
          configured: false,
          items: [],
          message: "Banco de dados ainda nao configurado. Configure DATABASE_URL na Vercel.",
        },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    return NextResponse.json(
      { configured: true, items },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao conectar no banco.";
    return NextResponse.json(
      { configured: false, items: [], message },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}

export async function PATCH(request: NextRequest) {
  if (!hasAdminAccess(request)) {
    return NextResponse.json(
      { message: "Acesso protegido." },
      { status: 403, headers: { "Cache-Control": "no-store" } },
    );
  }

  const payload = (await request.json()) as {
    id?: string;
    status?: string;
    reviewNote?: string;
  };

  if (!payload.id || !isStatus(payload.status)) {
    return NextResponse.json(
      { message: "Pedido ou status invalido." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  let item = null;
  try {
    item = await updateParticipantRequestStatus(
      payload.id,
      payload.status,
      String(payload.reviewNote || "").trim(),
    );
    if (item && payload.status === "aprovado") {
      await sendParticipantApprovedEmail(item);
    }
    if (item && payload.status === "reprovado") {
      await sendParticipantDeniedEmail(item);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao atualizar no banco.";
    return NextResponse.json(
      { message },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }

  if (!item) {
    return NextResponse.json(
      { message: "Banco nao configurado ou pedido nao encontrado." },
      { status: 404, headers: { "Cache-Control": "no-store" } },
    );
  }

  return NextResponse.json(
    { message: "Pedido atualizado.", item },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function DELETE(request: NextRequest) {
  if (!hasAdminAccess(request)) {
    return NextResponse.json(
      { message: "Acesso protegido." },
      { status: 403, headers: { "Cache-Control": "no-store" } },
    );
  }

  const payload = (await request.json()) as { id?: string };
  if (!payload.id) {
    return NextResponse.json(
      { message: "Pedido invalido." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const deleted = await deleteParticipantRequest(payload.id);
    if (!deleted) {
      return NextResponse.json(
        { message: "Pedido nao encontrado." },
        { status: 404, headers: { "Cache-Control": "no-store" } },
      );
    }

    return NextResponse.json(
      { message: "Pedido excluido com sucesso." },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao excluir pedido.";
    return NextResponse.json(
      { message },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
