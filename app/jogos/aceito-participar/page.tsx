import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { AceitoParticiparForm } from "./aceito-participar-form";

export const metadata: Metadata = {
  title: "ACEITO PARTICIPAR DO PROGRAMA ! | Café com Zákia",
  description:
    "Documento digital para convidados selecionados confirmarem participação voluntária no programa Café com Zákia.",
  alternates: {
    canonical: "https://www.cafecomzakia.com.br/jogos/aceito-participar",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AceitoParticiparPage() {
  return (
    <main className="accept-page">
      <header className="sorteio-header">
        <Link href="/jogos">Voltar para jogos</Link>
        <div>
          <p>Documento de participação</p>
          <h1>ACEITO PARTICIPAR DO PROGRAMA !</h1>
        </div>
        <Link href="/" aria-label="Café com Zákia">
          Início
        </Link>
      </header>

      <section className="accept-hero">
        <div className="accept-shell">
          <div className="accept-copy">
            <p className="eyebrow">Café com Zákia • Falando de Negócios</p>
            <h2>Confirmação segura para convidados selecionados.</h2>
            <p>
              Este documento registra que a pessoa selecionada participa por livre vontade,
              entende que será entrevistada no programa Café com Zákia e confirma que responderá
              apenas o que desejar durante a gravação.
            </p>
            <div className="accept-note">
              <strong>Envio automático</strong>
              <span>
                Ao finalizar, o sistema gera um PDF e envia para cafecomzakia@gmail.com quando
                o envio de e-mail estiver configurado na Vercel.
              </span>
            </div>
          </div>

          <Suspense fallback={null}>
            <AceitoParticiparForm />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
