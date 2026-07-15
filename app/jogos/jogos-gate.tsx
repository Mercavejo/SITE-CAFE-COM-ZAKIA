"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";

const accessCode = "5832";

const tools = [
  {
    title: "Preenchimento do participante",
    description:
      "Etapa 1: link publico para o convidado preencher dados, links, temas e assuntos. A equipe recebe por e-mail e decide se aprova a continuidade.",
    href: "/jogos/sorteio/preencher",
    cta: "Abrir formulario publico",
    tag: "Etapa 1",
    public: true,
  },
  {
    title: "Novos pedidos de participantes",
    description:
      "Admin: veja quem preencheu, aprove ou reprove o pedido e envie o link do aceite digital para quem for selecionado.",
    href: "/jogos/pedidos",
    cta: "Analisar pedidos",
    tag: "Admin",
  },
  {
    title: "Sorteio de Perguntas",
    description:
      "Etapa 2: a equipe abre o preenchimento aprovado, gera prompt, cria perguntas e organiza o sorteio da entrevista.",
    href: "/jogos/sorteio",
    cta: "Entrar no Sorteio",
    tag: "Etapa 2",
  },
  {
    title: "ACEITO PARTICIPAR DO PROGRAMA !",
    description:
      "Etapa 3: contrato digital para quem foi aprovado pela equipe confirmar participacao voluntaria e assinar o aceite.",
    href: "/jogos/aceito-participar",
    cta: "Abrir documento",
    tag: "Etapa 3",
  },
  {
    title: "CARFUK: DZ Racing",
    description:
      "Jogo oficial de corrida arcade do Cafe com Zakia, com ate 4 jogadores no mesmo dispositivo e entrada online rapida.",
    href: "/jogos/carfuk/index.html",
    cta: "Entrar no CARFUK",
    tag: "Jogo",
  },
];

export function JogosGate() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const hasAccess =
      document.cookie.includes("jogos_access=5832") ||
      document.cookie.includes("carfuk_access=5832");
    window.requestAnimationFrame(() => setUnlocked(hasAccess));
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.trim() !== accessCode) {
      setError("Senha incorreta. Confira o codigo e tente novamente.");
      setUnlocked(false);
      return;
    }

    document.cookie = "jogos_access=5832; path=/; max-age=2592000; SameSite=Lax";
    document.cookie = "carfuk_access=5832; path=/; max-age=2592000; SameSite=Lax";
    setError("");
    setUnlocked(true);
  }

  return (
    <section className="game-gate" aria-label="Area protegida de jogos e ferramentas">
      <div className="game-gate-card games-hub-card">
        <p className="eyebrow">Jogos Cafe com Zakia</p>
        <h1>Area de Jogos</h1>
        <p>
          Fluxo de entrevistas: primeiro o participante preenche os dados, depois a equipe
          analisa no Sorteio de Perguntas e, se aprovado, libera o aceite digital.
        </p>

        <form className="game-password-form" onSubmit={handleSubmit}>
          <label htmlFor="gamePassword">Senha de acesso</label>
          <div className="game-password-row">
            <input
              id="gamePassword"
              inputMode="numeric"
              maxLength={4}
              pattern="[0-9]*"
              placeholder="Digite a senha"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="button primary" type="submit">
              Liberar area
            </button>
          </div>
          {error ? <strong className="game-password-error">{error}</strong> : null}
        </form>

        <div className="games-tool-grid">
          {tools.map((tool) => (
            <article className="games-tool-card" key={tool.href}>
              <span>{tool.tag}</span>
              <h2>{tool.title}</h2>
              <p>{tool.description}</p>
              {unlocked || tool.public ? (
                <Link className="button primary full" href={tool.href}>
                  {tool.cta}
                </Link>
              ) : (
                <button className="button secondary full" disabled type="button">
                  Digite a senha para liberar
                </button>
              )}
            </article>
          ))}
        </div>

        <div className="game-note">
          <strong>Senha atual:</strong> acesso protegido para ferramentas internas do Cafe com
          Zakia. Use a senha autorizada para abrir cada item.
        </div>
      </div>
    </section>
  );
}
