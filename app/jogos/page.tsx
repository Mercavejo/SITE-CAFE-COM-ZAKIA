import type { Metadata } from "next";
import { JogosGate } from "./jogos-gate";

const whatsappUrl =
  "https://wa.me/5517996240418?text=Ol%C3%A1!%20Quero%20saber%20sobre%20os%20jogos%20do%20Caf%C3%A9%20com%20Z%C3%A1kia.";

export const metadata: Metadata = {
  title: "Jogos | Café com Zákia",
  description:
    "Área de jogos do Café com Zákia com acesso protegido ao CARFUK: DZ Racing.",
  alternates: {
    canonical: "https://www.cafecomzakia.com.br/jogos",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function JogosPage() {
  return (
    <main className="games-page">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Café com Zákia">
          <img src="/assets/logo-white.png" alt="Café com Zákia" />
        </a>
        <nav aria-label="Navegação principal">
          <a href="/#autoridade">Autoridade</a>
          <a href="/#programa">Programa</a>
          <a href="/pacote">Pacote</a>
          <a href="/spotify">Spotify</a>
          <a href="/jogos">Jogos</a>
          <a href="/#participar">Participar</a>
        </nav>
        <a className="nav-cta" href={whatsappUrl} target="_blank" rel="noopener">
          Quero participar
        </a>
      </header>

      <JogosGate />
    </main>
  );
}
