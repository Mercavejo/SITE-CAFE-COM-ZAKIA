import type { Metadata } from "next";
import { SorteioApp } from "./sorteio-app";

export const metadata: Metadata = {
  title: "Sorteio de Perguntas | Café com Zákia",
  description:
    "Ferramenta protegida para preparar entrevistas e sortear perguntas em modo TV no Café com Zákia.",
  alternates: {
    canonical: "https://www.cafecomzakia.com.br/jogos/sorteio",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function SorteioPage() {
  return <SorteioApp />;
}
