import type { Metadata } from "next";
import Link from "next/link";
import { PedidosParticipantesClient } from "./pedidos-participantes-client";

export const metadata: Metadata = {
  title: "Novos pedidos de participantes | Cafe com Zakia",
  description:
    "Area administrativa para analisar pedidos de participantes do programa Cafe com Zakia.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PedidosParticipantesPage() {
  return (
    <main className="pedidos-page">
      <header className="sorteio-header">
        <Link href="/jogos">Voltar para jogos</Link>
        <div>
          <p>Admin de participantes</p>
          <h1>Novos pedidos de participantes</h1>
        </div>
        <Link href="/jogos/sorteio/preencher">Formulario publico</Link>
      </header>

      <PedidosParticipantesClient />
    </main>
  );
}
