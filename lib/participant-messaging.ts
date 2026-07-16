import { ParticipantRequestRecord } from "./participant-db";

const siteUrl = "https://www.cafecomzakia.com.br";
const destinationEmail = process.env.PARTICIPACAO_EMAIL_TO || "cafecomzakia@gmail.com";
const fromEmail = process.env.PARTICIPACAO_EMAIL_FROM || "Cafe com Zakia <onboarding@resend.dev>";

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function encodePayload(payload: Record<string, unknown>) {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64");
}

export function buildAcceptanceLink(item: Pick<ParticipantRequestRecord, "name" | "email" | "whatsapp" | "social">) {
  const payload = {
    nome: item.name,
    email: item.email,
    whatsapp: item.whatsapp,
    redeSocial: item.social,
    aprovadoEm: new Date().toISOString(),
  };

  return `${siteUrl}/jogos/aceito-participar?participante=${encodeURIComponent(encodePayload(payload))}`;
}

export function buildDecisionLink(item: Pick<ParticipantRequestRecord, "id" | "decisionToken">, action: "aprovado" | "reprovado") {
  return `${siteUrl}/api/admin/pedidos/decidir?id=${encodeURIComponent(item.id)}&token=${encodeURIComponent(
    item.decisionToken,
  )}&action=${action}`;
}

async function sendResendEmail(input: {
  to: string[];
  subject: string;
  html: string;
  attachments?: Array<{ filename: string; content: string }>;
}) {
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
      ...input,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Falha no envio de e-mail: ${errorText.slice(0, 240)}`);
  }

  return true;
}

export async function sendInternalPreenchimentoEmail(data: {
  nome: string;
  email: string;
  whatsapp: string;
  redeSocial: string;
  enviadoEm: string;
  importLink: string;
  links: string;
  resumo: string;
  objetivo: string;
  temas: string;
  temasProibidos: string;
  perguntasDesejadas: string;
  observacoes: string;
  request?: ParticipantRequestRecord | null;
}) {
  const approveLink = data.request ? buildDecisionLink(data.request, "aprovado") : `${siteUrl}/jogos/pedidos`;
  const denyLink = data.request ? buildDecisionLink(data.request, "reprovado") : `${siteUrl}/jogos/pedidos`;

  return sendResendEmail({
    to: [destinationEmail],
    subject: `PREENCHIMENTO DO PARTICIPANTE - ${data.nome}`,
    html: `
      <div style="font-family:Arial,sans-serif;color:#171717;line-height:1.55">
        <h2>Novo preenchimento do participante</h2>
        <p><strong>Status:</strong> analisar se sera aprovado para a etapa ACEITO PARTICIPAR DO PROGRAMA.</p>
        <p>
          <a href="${escapeHtml(approveLink)}" style="display:inline-block;background:#d4af37;color:#070707;font-weight:800;padding:12px 18px;border-radius:6px;text-decoration:none;margin-right:10px">Aprovar participante</a>
          <a href="${escapeHtml(denyLink)}" style="display:inline-block;background:#222;color:#fff;font-weight:800;padding:12px 18px;border-radius:6px;text-decoration:none">Negar participante</a>
        </p>
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
      </div>
    `,
  });
}

export async function sendParticipantReceivedEmail(data: { nome: string; email: string }) {
  return sendResendEmail({
    to: [data.email],
    subject: "Recebemos seu pedido para participar do Cafe com Zakia",
    html: `
      <div style="font-family:Arial,sans-serif;color:#171717;line-height:1.65">
        <h2>Seu pedido foi enviado com sucesso.</h2>
        <p>Ola, ${escapeHtml(data.nome)}.</p>
        <p>Recebemos seu preenchimento para participar do <strong>Cafe com Zakia</strong>.</p>
        <p>Sua historia sera analisada com cuidado pela nossa equipe. Buscamos pessoas, trajetorias e mensagens que possam somar com a vida de muita gente, com seriedade, verdade e valor.</p>
        <p>Se o seu perfil for aprovado para a proxima etapa, voce recebera um novo e-mail com o acesso ao documento <strong>ACEITO PARTICIPAR DO PROGRAMA !</strong>.</p>
        <p>Obrigado por desejar fazer parte dessa mesa.</p>
        <p><strong>Equipe Cafe com Zakia</strong><br />Mercavejo Consultoria</p>
      </div>
    `,
  });
}

export async function sendParticipantApprovedEmail(item: ParticipantRequestRecord) {
  const acceptanceLink = buildAcceptanceLink(item);

  return sendResendEmail({
    to: [item.email],
    subject: "Parabens, voce foi aprovado para participar do Cafe com Zakia",
    html: `
      <div style="font-family:Arial,sans-serif;color:#171717;line-height:1.65">
        <h2>Parabens, ${escapeHtml(item.name)}.</h2>
        <p>Sua historia foi aprovada pela equipe do <strong>Cafe com Zakia</strong>.</p>
        <p>Isso significa que voce avancou para a proxima etapa para participar do programa. A nossa equipe entende que sua trajetoria pode gerar uma conversa com valor, presenca e impacto para outras pessoas.</p>
        <p>Agora precisamos que voce preencha e assine o documento digital <strong>ACEITO PARTICIPAR DO PROGRAMA !</strong>.</p>
        <p>
          <a href="${escapeHtml(acceptanceLink)}" style="display:inline-block;background:#d4af37;color:#070707;font-weight:900;padding:14px 20px;border-radius:6px;text-decoration:none">Assinar aceite de participacao</a>
        </p>
        <p>Depois do envio, a equipe dara continuidade aos proximos alinhamentos.</p>
        <p><strong>Equipe Cafe com Zakia</strong><br />Mercavejo Consultoria</p>
      </div>
    `,
  });
}

export async function sendParticipantDeniedEmail(item: ParticipantRequestRecord) {
  return sendResendEmail({
    to: [item.email],
    subject: "Analise do seu pedido para o Cafe com Zakia",
    html: `
      <div style="font-family:Arial,sans-serif;color:#171717;line-height:1.65">
        <h2>Obrigado pelo seu interesse, ${escapeHtml(item.name)}.</h2>
        <p>Recebemos e analisamos seu pedido para participar do <strong>Cafe com Zakia</strong>.</p>
        <p>Neste momento, sua historia nao avancara para a proxima etapa do programa. Essa decisao faz parte da curadoria editorial da equipe, que avalia temas, momento, alinhamento e formato de cada entrevista.</p>
        <p>Agradecemos por compartilhar sua trajetoria conosco.</p>
        <p><strong>Equipe Cafe com Zakia</strong><br />Mercavejo Consultoria</p>
      </div>
    `,
  });
}

export async function sendParticipationPdfEmail(pdfBase64: string, filename: string, data: {
  nomeCompleto: string;
  email: string;
  whatsapp: string;
  redeSocial: string;
}) {
  return sendResendEmail({
    to: [destinationEmail],
    subject: `ACEITO PARTICIPAR DO PROGRAMA - ${data.nomeCompleto}`,
    html: `
      <h2>Novo aceite de participacao</h2>
      <p><strong>Nome:</strong> ${escapeHtml(data.nomeCompleto)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>WhatsApp:</strong> ${escapeHtml(data.whatsapp)}</p>
      <p><strong>Rede social:</strong> ${escapeHtml(data.redeSocial)}</p>
      <p>O PDF assinado digitalmente esta anexado a este e-mail.</p>
    `,
    attachments: [{ filename, content: pdfBase64 }],
  });
}
