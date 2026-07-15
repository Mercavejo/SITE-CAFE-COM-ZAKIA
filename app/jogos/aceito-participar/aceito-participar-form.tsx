"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type FormStatus = {
  type: "idle" | "success" | "error";
  message: string;
};

type SubmitResponse = {
  message?: string;
  pdfBase64?: string;
  filename?: string;
};

type ParticipantPrefill = {
  nome?: string;
  email?: string;
  whatsapp?: string;
  redeSocial?: string;
};

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function normalizeName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function formatCpf(value: string) {
  const digits = onlyDigits(value).slice(0, 11);
  return digits
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

function formatWhatsapp(value: string) {
  return onlyDigits(value).slice(0, 13);
}

function downloadPdfFromBase64(pdfBase64: string, filename: string) {
  const link = document.createElement("a");
  link.href = `data:application/pdf;base64,${pdfBase64}`;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function decodeParticipantPrefill(value: string | null) {
  if (!value) return null;

  try {
    const binary = atob(value);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const text = new TextDecoder().decode(bytes);
    return JSON.parse(text) as ParticipantPrefill;
  } catch {
    return null;
  }
}

export function AceitoParticiparForm() {
  const searchParams = useSearchParams();
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [redeSocial, setRedeSocial] = useState("");
  const [assinatura, setAssinatura] = useState("");
  const [aceitePrograma, setAceitePrograma] = useState(false);
  const [aceiteImagem, setAceiteImagem] = useState(false);
  const [empresa, setEmpresa] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<FormStatus>({ type: "idle", message: "" });

  const signatureMatches = useMemo(() => {
    return normalizeName(nomeCompleto) !== "" && normalizeName(nomeCompleto) === normalizeName(assinatura);
  }, [assinatura, nomeCompleto]);

  useEffect(() => {
    const prefill = decodeParticipantPrefill(searchParams.get("participante"));
    if (!prefill) return;

    setNomeCompleto(String(prefill.nome || ""));
    setEmail(String(prefill.email || ""));
    setWhatsapp(formatWhatsapp(String(prefill.whatsapp || "")));
    setRedeSocial(String(prefill.redeSocial || ""));
  }, [searchParams]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: "idle", message: "" });

    if (!signatureMatches) {
      setStatus({
        type: "error",
        message: "A assinatura precisa ser o nome completo exatamente como preenchido no cadastro.",
      });
      return;
    }

    if (!aceitePrograma || !aceiteImagem) {
      setStatus({
        type: "error",
        message: "Assinale as confirmacoes obrigatorias para gerar o documento.",
      });
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch("/api/participacao-programa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nomeCompleto,
          cpf,
          email,
          whatsapp,
          redeSocial,
          assinatura,
          aceitePrograma,
          aceiteImagem,
          empresa,
        }),
      });
      const result = (await response.json()) as SubmitResponse;

      if (!response.ok) {
        throw new Error(result.message || "Nao foi possivel enviar o documento agora.");
      }

      if (result.pdfBase64) {
        downloadPdfFromBase64(result.pdfBase64, result.filename || "aceito-participar-cafe-com-zakia.pdf");
      }

      setStatus({
        type: "success",
        message: result.message || "Documento enviado com sucesso para o Café com Zákia.",
      });
      setNomeCompleto("");
      setCpf("");
      setEmail("");
      setWhatsapp("");
      setRedeSocial("");
      setAssinatura("");
      setAceitePrograma(false);
      setAceiteImagem(false);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Nao foi possivel enviar o documento agora.",
      });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <form className="accept-form" onSubmit={handleSubmit}>
      <input
        className="accept-hp"
        tabIndex={-1}
        autoComplete="off"
        name="empresa"
        value={empresa}
        onChange={(event) => setEmpresa(event.target.value)}
      />

      <div className="accept-form-heading">
        <span>Documento digital</span>
        <h3>Dados do participante</h3>
        <p>Preencha com dados reais. O CPF nao fica exposto no site; ele e usado apenas no PDF enviado a equipe.</p>
      </div>

      <label>
        Nome completo
        <input
          required
          autoComplete="name"
          minLength={8}
          value={nomeCompleto}
          onChange={(event) => setNomeCompleto(event.target.value)}
          placeholder="Digite seu nome completo"
        />
      </label>

      <label>
        CPF
        <input
          required
          inputMode="numeric"
          minLength={14}
          maxLength={14}
          value={cpf}
          onChange={(event) => setCpf(formatCpf(event.target.value))}
          placeholder="000.000.000-00"
        />
      </label>

      <label>
        E-mail
        <input
          required
          autoComplete="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="seuemail@email.com"
        />
      </label>

      <label>
        WhatsApp
        <input
          required
          autoComplete="tel"
          inputMode="tel"
          minLength={10}
          value={whatsapp}
          onChange={(event) => setWhatsapp(formatWhatsapp(event.target.value))}
          placeholder="17999999999"
        />
      </label>

      <label className="accept-wide">
        Rede social mais usada
        <input
          required
          value={redeSocial}
          onChange={(event) => setRedeSocial(event.target.value)}
          placeholder="@instagram, LinkedIn, Facebook ou outra rede principal"
        />
      </label>

      <div className="accept-terms accept-wide">
        <label>
          <input
            required
            type="checkbox"
            checked={aceitePrograma}
            onChange={(event) => setAceitePrograma(event.target.checked)}
          />
          <span>ACEITO PARTICIPAR DO PROGRAMA ! Confirmo que fui selecionado(a), participo por livre vontade e responderei apenas o que desejar.</span>
        </label>

        <label>
          <input
            required
            type="checkbox"
            checked={aceiteImagem}
            onChange={(event) => setAceiteImagem(event.target.checked)}
          />
          <span>Autorizo a gravação, edição e publicação da minha imagem e voz no Café com Zákia, podendo solicitar análise conjunta sobre eventual retirada de trecho específico.</span>
        </label>
      </div>

      <label className="accept-wide">
        Assinatura com nome completo
        <input
          required
          minLength={8}
          value={assinatura}
          onChange={(event) => setAssinatura(event.target.value)}
          placeholder="Repita seu nome completo como assinatura digital"
        />
        <small className={signatureMatches ? "accept-ok" : ""}>
          {signatureMatches
            ? "Assinatura conferida com o nome completo."
            : "A assinatura deve repetir o nome completo preenchido acima."}
        </small>
      </label>

      <div className="accept-legal accept-wide">
        <strong>Declaracao resumida</strong>
        <p>
          A participação é voluntária. O participante reconhece que sua imagem, voz e falas
          poderão ser gravadas, editadas e publicadas em formatos de podcast, vídeo, cortes,
          redes sociais e materiais institucionais do programa. Dados pessoais serão usados
          somente para identificação, contato, emissão e arquivo deste documento.
        </p>
      </div>

      <button className="button primary full accept-submit" disabled={isSending} type="submit">
        {isSending ? "Gerando PDF e enviando..." : "Assinar e enviar PDF"}
      </button>

      {status.message ? (
        <strong className={`accept-status ${status.type}`}>{status.message}</strong>
      ) : null}
    </form>
  );
}
