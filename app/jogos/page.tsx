import type { Metadata } from "next";
import Link from "next/link";
import { JogosGate } from "./jogos-gate";

const whatsappUrl =
  "https://wa.me/5517996240418?text=Ol%C3%A1!%20Quero%20saber%20sobre%20os%20jogos%20do%20Caf%C3%A9%20com%20Z%C3%A1kia.";

export const metadata: Metadata = {
  title: "Jogos | Café com Zákia",
  description:
    "Área de jogos e ferramentas do Café com Zákia com acesso protegido ao CARFUK: DZ Racing e ao Sorteio de Perguntas.",
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
        <Link className="brand" href="/" aria-label="Café com Zákia">
          <img src="/assets/logo-white.png" alt="Café com Zákia" />
        </Link>
        <nav aria-label="Navegação principal">
          <Link href="/#autoridade">Autoridade</Link>
          <Link href="/#programa">Programa</Link>
          <Link href="/pacote">Pacote</Link>
          <Link href="/spotify">Spotify</Link>
          <Link href="/jogos">Jogos</Link>
          <Link href="/#participar">Participar</Link>
        </nav>
        <a className="nav-cta" href={whatsappUrl} target="_blank" rel="noopener">
          Quero participar
        </a>
      </header>

      <JogosGate />
    </main>
  );
}
