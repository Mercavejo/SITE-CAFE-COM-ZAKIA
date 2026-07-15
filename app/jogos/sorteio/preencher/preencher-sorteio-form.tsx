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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
    const origin = window.location.origin;
    const importLink = `${origin}/jogos/sorteio?preenchimento=${encodeURIComponent(encoded)}`;
    const message = [
      "Olá, preenchi meus dados para participar do Café com Zákia.",
      "",
      "Link do meu preenchimento:",
      importLink,
    ].join("\n");
    const nextWhatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    setGeneratedLink(importLink);
    setWhatsappLink(nextWhatsappLink);
    setStatus("Preenchimento pronto. Clique no botão para enviar pelo WhatsApp.");
    window.open(nextWhatsappLink, "_blank", "noopener,noreferrer");
  }

  async function copyLink() {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    setStatus("Link copiado. Envie para a equipe do Café com Zákia.");
  }

  return (
    <form className="public-sorteio-form" onSubmit={handleSubmit}>
      <div className="public-sorteio-heading">
        <span>Preenchimento do participante</span>
        <h2>Dados para preparação da entrevista</h2>
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
        <textarea name="links" placeholder="Cole aqui links importantes sobre você." />
      </label>

      <label className="public-wide">
        Resumo sobre você
        <textarea name="resumo" placeholder="Conte sua história, profissão, empresa, trajetória e pontos importantes." />
      </label>

      <label>
        Objetivo da conversa
        <textarea name="objetivo" placeholder="O que você gostaria que essa entrevista mostrasse?" />
      </label>

      <label>
        Temas principais
        <textarea name="temas" placeholder="Negócios, carreira, superação, política, saúde, bastidores..." />
      </label>

      <label className="public-wide">
        Temas proibidos ou delicados
        <textarea name="temasProibidos" placeholder="Informe assuntos que prefere evitar ou tratar com cuidado." />
      </label>

      <label className="public-wide">
        Perguntas ou assuntos que você gostaria de responder
        <textarea name="perguntasDesejadas" placeholder="Escreva perguntas, histórias ou assuntos que você acha importantes para o programa." />
      </label>

      <label className="public-wide">
        Observações finais
        <textarea name="observacoes" placeholder="Qualquer informação extra para a equipe." />
      </label>

      <button className="button primary full public-wide" type="submit">
        Enviar preenchimento pelo WhatsApp
      </button>

      {generatedLink ? (
        <div className="public-generated public-wide">
          <strong>Link gerado</strong>
          <textarea readOnly value={generatedLink} />
          <div>
            <a className="button primary" href={whatsappLink} target="_blank" rel="noopener">
              Abrir WhatsApp
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
