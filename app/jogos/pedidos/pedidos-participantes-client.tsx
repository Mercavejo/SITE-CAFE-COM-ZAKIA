"use client";

import { useEffect, useMemo, useState } from "react";

type RequestStatus = "novo" | "aprovado" | "reprovado";

type ParticipantRequest = {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: RequestStatus;
  name: string;
  email: string;
  whatsapp: string;
  social: string;
  payload: Record<string, unknown>;
  importLink: string;
  reviewNote: string | null;
};

type ApiListResponse = {
  configured: boolean;
  items: ParticipantRequest[];
  message?: string;
};

const whatsappNumber = "5517996240418";

function encodePayload(payload: Record<string, unknown>) {
  const bytes = new TextEncoder().encode(JSON.stringify(payload));
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

function participantString(value: unknown) {
  return String(value || "").trim();
}

function buildAcceptanceLink(item: ParticipantRequest) {
  const payload = {
    nome: item.name,
    email: item.email,
    whatsapp: item.whatsapp,
    redeSocial: item.social,
    aprovadoEm: new Date().toISOString(),
  };

  return `https://www.cafecomzakia.com.br/jogos/aceito-participar?participante=${encodeURIComponent(
    encodePayload(payload),
  )}`;
}

function buildWhatsappApprovalLink(item: ParticipantRequest) {
  const acceptanceLink = buildAcceptanceLink(item);
  const message = [
    `Ola ${item.name}, sua historia foi aprovada pela equipe do Cafe com Zakia.`,
    "",
    "Proxima etapa: assine o aceite digital para participar do programa:",
    acceptanceLink,
  ].join("\n");

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function PedidosParticipantesClient() {
  const [items, setItems] = useState<ParticipantRequest[]>([]);
  const [configured, setConfigured] = useState(true);
  const [status, setStatus] = useState("Carregando pedidos...");
  const [updatingId, setUpdatingId] = useState("");

  const counters = useMemo(() => {
    return {
      novo: items.filter((item) => item.status === "novo").length,
      aprovado: items.filter((item) => item.status === "aprovado").length,
      reprovado: items.filter((item) => item.status === "reprovado").length,
    };
  }, [items]);

  async function loadItems() {
    setStatus("Carregando pedidos...");
    try {
      const response = await fetch("/api/admin/pedidos", { cache: "no-store" });
      const result = (await response.json()) as ApiListResponse;
      if (!response.ok) {
        throw new Error(result.message || "Nao foi possivel carregar os pedidos.");
      }

      setConfigured(result.configured);
      setItems(result.items || []);
      setStatus(result.message || `${result.items?.length || 0} pedido(s) encontrados.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Nao foi possivel carregar os pedidos.");
    }
  }

  async function updateStatus(item: ParticipantRequest, nextStatus: RequestStatus) {
    setUpdatingId(item.id);
    try {
      const response = await fetch("/api/admin/pedidos", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, status: nextStatus }),
      });
      const result = (await response.json()) as { message?: string; item?: ParticipantRequest };
      if (!response.ok || !result.item) {
        throw new Error(result.message || "Nao foi possivel atualizar o pedido.");
      }

      setItems((current) =>
        current.map((currentItem) => (currentItem.id === item.id ? result.item! : currentItem)),
      );
      setStatus(result.message || "Pedido atualizado.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Nao foi possivel atualizar o pedido.");
    } finally {
      setUpdatingId("");
    }
  }

  useEffect(() => {
    void loadItems();
  }, []);

  return (
    <section className="pedidos-shell">
      <div className="pedidos-summary">
        <article>
          <span>Novos</span>
          <strong>{counters.novo}</strong>
        </article>
        <article>
          <span>Aprovados</span>
          <strong>{counters.aprovado}</strong>
        </article>
        <article>
          <span>Reprovados</span>
          <strong>{counters.reprovado}</strong>
        </article>
        <button className="button secondary" type="button" onClick={loadItems}>
          Atualizar lista
        </button>
      </div>

      <strong className={configured ? "pedidos-status" : "pedidos-status error"}>{status}</strong>

      {!configured ? (
        <div className="pedidos-warning">
          <strong>Banco ainda nao conectado.</strong>
          <p>
            O sistema ja esta preparado para salvar pedidos e PDFs. Falta criar/conectar um
            Postgres na Vercel e configurar a variavel <code>DATABASE_URL</code> em Production.
          </p>
        </div>
      ) : null}

      <div className="pedidos-grid">
        {items.map((item) => {
          const acceptanceLink = buildAcceptanceLink(item);
          return (
            <article className={`pedido-card status-${item.status}`} key={item.id}>
              <div className="pedido-card-head">
                <span>{item.status}</span>
                <small>{formatDate(item.createdAt)}</small>
              </div>

              <h2>{item.name}</h2>
              <p>{item.email}</p>
              <p>WhatsApp: {item.whatsapp}</p>
              <p>Rede social: {item.social}</p>

              <div className="pedido-details">
                <strong>Resumo informado</strong>
                <p>{participantString(item.payload.resumo) || "Nao informado."}</p>
                <strong>Objetivo</strong>
                <p>{participantString(item.payload.objetivo) || "Nao informado."}</p>
                <strong>Temas</strong>
                <p>{participantString(item.payload.temas) || "Nao informado."}</p>
              </div>

              <div className="pedido-actions">
                <button
                  className="button primary"
                  disabled={updatingId === item.id}
                  type="button"
                  onClick={() => updateStatus(item, "aprovado")}
                >
                  Aprovar
                </button>
                <button
                  className="button secondary"
                  disabled={updatingId === item.id}
                  type="button"
                  onClick={() => updateStatus(item, "reprovado")}
                >
                  Reprovar
                </button>
              </div>

              <div className="pedido-links">
                <a className="button secondary" href={item.importLink}>
                  Abrir no Sorteio de Perguntas
                </a>
                <a className="button secondary" href={acceptanceLink}>
                  Abrir aceite digital
                </a>
                <a
                  className="button primary"
                  href={buildWhatsappApprovalLink(item)}
                  target="_blank"
                  rel="noopener"
                >
                  Enviar aprovacao no WhatsApp
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
