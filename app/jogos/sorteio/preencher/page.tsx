import type { Metadata } from "next";
import Link from "next/link";
import { PreencherSorteioForm } from "./preencher-sorteio-form";

export const metadata: Metadata = {
  title: "Preencher dados da entrevista | Café com Zákia",
  description:
    "Área pública para convidados preencherem dados e assuntos sugeridos para entrevista no Café com Zákia.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PreencherSorteioPage() {
  return (
    <main className="public-sorteio-page">
      <section className="public-sorteio-shell">
        <div className="public-sorteio-copy">
          <p className="eyebrow">Café com Zákia • Pré-entrevista</p>
          <h1>Preencha seus dados para a equipe preparar sua entrevista.</h1>
          <p>
            Esta área é exclusiva para o participante preencher suas informações, links,
            temas importantes e assuntos que deseja abordar. A área administrativa do sorteio
            permanece protegida e não aparece para o convidado.
          </p>
          <div className="public-sorteio-note">
            <strong>Como funciona</strong>
            <span>
              Ao enviar, será gerado um link seguro para WhatsApp. A equipe abre esse link e o
              cadastro entra no sistema marcado como <b>Preenchimento pela pessoa</b>.
            </span>
          </div>
          <Link className="button secondary" href="/">
            Voltar ao site
          </Link>
        </div>

        <PreencherSorteioForm />
      </section>
    </main>
  );
}
