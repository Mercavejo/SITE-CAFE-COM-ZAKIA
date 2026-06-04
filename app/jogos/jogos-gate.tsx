"use client";

import { FormEvent, useEffect, useState } from "react";

const accessCode = "5832";
const gameUrl = "/jogos/carfuk/index.html";

export function JogosGate() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setUnlocked(document.cookie.includes("carfuk_access=5832"));
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.trim() !== accessCode) {
      setError("Senha incorreta. Confira o codigo e tente novamente.");
      setUnlocked(false);
      return;
    }

    document.cookie = "carfuk_access=5832; path=/; max-age=2592000; SameSite=Lax";
    setError("");
    setUnlocked(true);
  }

  return (
    <section className="game-gate" aria-label="Acesso protegido ao jogo CARFUK">
      <div className="game-gate-card">
        <p className="eyebrow">Jogos Café com Zákia</p>
        <h1>CARFUK: DZ Racing</h1>
        <p>
          Primeiro jogo oficial do Café com Zákia. Digite a senha de acesso para abrir a
          página do jogo.
        </p>

        <form className="game-password-form" onSubmit={handleSubmit}>
          <label htmlFor="gamePassword">Senha do jogo</label>
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
              Liberar jogo
            </button>
          </div>
          {error ? <strong className="game-password-error">{error}</strong> : null}
        </form>

        {unlocked ? (
          <div className="game-unlocked">
            <strong>Acesso liberado.</strong>
            <a className="button primary large" href={gameUrl}>
              Entrar no CARFUK
            </a>
          </div>
        ) : null}

        <div className="game-note">
          <strong>Modo atual:</strong> corrida arcade com ate 4 jogadores no mesmo dispositivo.
          O multiplayer online com salas sera uma etapa propria, com servidor de rede.
        </div>
      </div>
    </section>
  );
}
