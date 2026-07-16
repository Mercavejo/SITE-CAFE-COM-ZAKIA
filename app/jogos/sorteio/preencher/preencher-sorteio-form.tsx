"use client";

import { FormEvent, useState } from "react";

type PublicSubmission = {
  nome: string;
  email: string;
  whatsapp: string;
  redeSocial: string;
  links: string;
  resumo: string;
  objetivo: string;
  temas: string;
  temasProibidos: string;
  perguntasDesejadas: string;
  observacoes: string;
  enviadoEm: string;
};

const whatsappNumber = "5517996240418";

function encodeSubmission(data: PublicSubmission) {
  const bytes = new TextEncoder().encode(JSON.stringify(data));
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function PreencherSorteioForm() {
  const [status, setStatus] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const data: PublicSubmission = {
      nome: String(form.get("nome") || "").trim(),
      email: String(form.get("email") || "").trim(),
      whatsapp: onlyDigits(String(form.get("whatsapp") || "")),
      redeSocial: String(form.get("redeSocial") || "").trim(),
      links: String(form.get("links") || "").trim(),
      resumo: String(form.get("resumo") || "").trim(),
      objetivo: String(form.get("objetivo") || "").trim(),
      temas: String(form.get("temas") || "").trim(),
      temasProibidos: String(form.get("temasProibidos") || "").trim(),
      perguntasDesejadas: String(form.get("perguntasDesejadas") || "").trim(),
      observacoes: String(form.get("observacoes") || "").trim(),
      enviadoEm: new Date().toISOString(),
    };

    if (!data.nome || !data.email || !data.whatsapp || !data.redeSocial) {
      setStatus("Preencha nome, e-mail, WhatsApp e rede social para enviar.");
      return;
    }

    const encoded = encodeSubmission(data);
    const importLink = `https://www.cafecomzakia.com.br/jogos/sorteio?preenchimento=${encodeURIComponent(encoded)}`;
    const message = [
      "Ola, preenchi meus dados para participar do Cafe com Zakia.",
      "",
      "Link do meu preenchimento:",
      importLink,
    ].join("\n");
    const nextWhatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    setGeneratedLink(importLink);
    setWhatsappLink(nextWhatsappLink);
    setIsSending(true);

    try {
      const response = await fetch("/api/preenchimento-participante", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, importLink, empresa: "" }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) {
        throw new Error(result.message || "Nao foi possivel enviar para a equipe.");
      }
      setStatus(
        `${result.message || "Preenchimento enviado."} A equipe analisara e, se aprovado, voce recebera por e-mail a etapa ACEITO PARTICIPAR DO PROGRAMA. Se desejar, use tambem o botao do WhatsApp abaixo.`,
      );
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Nao foi possivel enviar para a equipe. Confira os dados e tente novamente.",
      );
    } finally {
      setIsSending(false);
    }
  }

  async function copyLink() {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    setStatus("Link copiado. Envie para a equipe do Cafe com Zakia.");
  }

  return (
    <form className="public-sorteio-form" onSubmit={handleSubmit}>
      <div className="public-sorteio-heading">
        <span>Preenchimento do participante</span>
        <h2>Dados para preparacao da entrevista</h2>
      </div>

      <label>
        Nome completo
        <input name="nome" required placeholder="Seu nome completo" />
      </label>

      <label>
        E-mail
        <input name="email" required type="email" placeholder="seuemail@email.com" />
      </label>

      <label>
        WhatsApp
        <input name="whatsapp" required inputMode="tel" placeholder="17 99999-9999" />
      </label>

      <label>
        Rede social mais usada
        <input name="redeSocial" required placeholder="@instagram, LinkedIn, Facebook..." />
      </label>

      <label className="public-wide">
        Links das redes, site ou entrevistas anteriores
        <textarea name="links" placeholder="Cole aqui links importantes sobre voce." />
      </label>

      <label className="public-wide">
        Resumo sobre voce
        <textarea name="resumo" placeholder="Conte sua historia, profissao, empresa, trajetoria e pontos importantes." />
      </label>

      <label>
        Objetivo da conversa
        <textarea name="objetivo" placeholder="O que voce gostaria que essa entrevista mostrasse?" />
      </label>

      <label>
        Temas principais
        <textarea name="temas" placeholder="Negocios, carreira, superacao, politica, saude, bastidores..." />
      </label>

      <label className="public-wide">
        Temas proibidos ou delicados
        <textarea name="temasProibidos" placeholder="Informe assuntos que prefere evitar ou tratar com cuidado." />
      </label>

      <label className="public-wide">
        Perguntas ou assuntos que voce gostaria de responder
        <textarea name="perguntasDesejadas" placeholder="Escreva perguntas, historias ou assuntos que voce acha importantes para o programa." />
      </label>

      <label className="public-wide">
        Observacoes finais
        <textarea name="observacoes" placeholder="Qualquer informacao extra para a equipe." />
      </label>

      <button className="button primary full public-wide" disabled={isSending} type="submit">
        {isSending ? "Enviando preenchimento..." : "Enviar preenchimento para analise"}
      </button>

      {generatedLink ? (
        <div className="public-generated public-wide">
          <strong>Envio opcional pelo WhatsApp</strong>
          <textarea readOnly value={generatedLink} />
          <div>
            <a className="button primary" href={whatsappLink} target="_blank" rel="noopener">
              Enviar para o WhatsApp agora
            </a>
            <button className="button secondary" onClick={copyLink} type="button">
              Copiar link
            </button>
          </div>
        </div>
      ) : null}

      {status ? <strong className="public-status public-wide">{status}</strong> : null}
    </form>
  );
}
