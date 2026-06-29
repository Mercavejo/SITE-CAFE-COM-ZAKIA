"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";

const accessCode = "5832";

const tools = [
  {
    title: "CARFUK: DZ Racing",
    description:
      "Jogo oficial de corrida arcade do Café com Zákia, com até 4 jogadores no mesmo dispositivo e entrada online rápida.",
    href: "/jogos/carfuk/index.html",
    cta: "Entrar no CARFUK",
    tag: "Jogo",
  },
  {
    title: "Sorteio de Perguntas",
    description:
      "Ferramenta para preparar entrevistas, criar perguntas, importar imagens e sortear cards em modo TV.",
    href: "/jogos/sorteio",
    cta: "Entrar no Sorteio",
    tag: "Entrevistas",
  },
  {
    title: "ACEITO PARTICIPAR DO PROGRAMA !",
    description:
      "Documento seguro para o convidado selecionado confirmar dados, assinar o nome completo e autorizar sua participação no Café com Zákia.",
    href: "/jogos/aceito-participar",
    cta: "Abrir documento",
    tag: "Autorizacao",
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
      setError("Senha incorreta. Confira o código e tente novamente.");
      setUnlocked(false);
      return;
    }

    document.cookie = "jogos_access=5832; path=/; max-age=2592000; SameSite=Lax";
    document.cookie = "carfuk_access=5832; path=/; max-age=2592000; SameSite=Lax";
    setError("");
    setUnlocked(true);
  }

  return (
    <section className="game-gate" aria-label="Área protegida de jogos e ferramentas">
      <div className="game-gate-card games-hub-card">
        <p className="eyebrow">Jogos Café com Zákia</p>
        <h1>Área de Jogos</h1>
        <p>
          Escolha o que deseja abrir. O CARFUK e o Sorteio de Perguntas ficam separados,
          cada um com seu próprio link dentro da área de jogos.
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
              Liberar área
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
              {unlocked ? (
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
          <strong>Senha atual:</strong> acesso protegido para ferramentas internas do Café com
          Zákia. Use a senha autorizada para abrir cada item.
        </div>
      </div>
    </section>
  );
}
