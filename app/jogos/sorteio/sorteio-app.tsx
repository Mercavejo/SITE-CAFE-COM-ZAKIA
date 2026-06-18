"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Mic, Square } from "lucide-react";

type Step = "entrevista" | "perguntas" | "banco" | "sorteio";

type Interview = {
  nome: string;
  estilo: string;
  links: string;
  resumo: string;
  objetivo: string;
  temas: string;
  temasProibidos: string;
  observacoes: string;
  criadoEm: string;
};

type QuestionCard = {
  id: string;
  tema: string;
  titulo: string;
  image: string;
  origem: "texto" | "imagem";
  criadoEm: string;
};

type VoiceFieldProps = {
  as?: "input" | "textarea";
  className?: string;
  defaultValue?: string;
  listeningField: string | null;
  name: string;
  placeholder: string;
  required?: boolean;
  startVoice: (fieldName: string, currentValue: string, setValue: (value: string) => void) => void | Promise<void>;
  stopVoice: () => void;
};

type SpeechRecognitionConstructor = new () => {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onend: (() => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionEvent = {
  resultIndex: number;
  results: {
    length: number;
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
      isFinal: boolean;
    };
  };
};

type SpeechRecognitionErrorEvent = {
  error: string;
  message?: string;
};

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

const storageKey = "cafe-zakia-sorteio-online";
const defaultThemes = ["Carreira", "Política", "Segurança", "Corrupção", "Perguntas Virais"];

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = `${current} ${word}`.trim();
    if (ctx.measureText(next).width <= maxWidth || !current) {
      current = next;
    } else {
      lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines;
}

function fitText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, maxHeight: number) {
  for (let size = 88; size >= 38; size -= 4) {
    ctx.font = `900 ${size}px Arial`;
    const lines = wrapText(ctx, text, maxWidth);
    if (lines.length * size * 1.16 <= maxHeight) {
      return { lines, size };
    }
  }
  ctx.font = "900 38px Arial";
  return { lines: wrapText(ctx, text, maxWidth), size: 38 };
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function buildGrokPrompt(interview: Interview) {
  return `Você é um produtor de entrevistas virais para o podcast Café com Zákia.

Monte perguntas com alto potencial de cortes curtos, reels e debates fortes.

ENTREVISTADO
Nome: ${interview.nome}
Links, redes e entrevistas anteriores: ${interview.links || "não informado"}

BASE DA ENTREVISTA
Estilo desejado: ${interview.estilo || "viral equilibrada"}
Resumo da pessoa: ${interview.resumo || "não informado"}
Objetivo da conversa: ${interview.objetivo || "gerar uma entrevista relevante e compartilhável"}
Temas principais: ${interview.temas || "carreira, opinião, bastidores e momentos de decisão"}
Temas proibidos ou delicados: ${interview.temasProibidos || "nenhum informado"}
Observações do apresentador: ${interview.observacoes || "não informado"}

TAREFA
1. Pesquise e considere o contexto público disponível sobre essa pessoa, os links acima e entrevistas anteriores.
2. Não invente fatos, cargos, polêmicas, crimes, frases ou acusações. Se algo não estiver confirmado, transforme em pergunta neutra.
3. Crie 40 perguntas virais, diretas e fortes, separadas por tema.
4. Cada pergunta deve caber em um card de TV 16:9, com texto curto e impacto imediato.
5. Misture perguntas de confronto, emoção, bastidores, carreira, opinião e frases que possam viralizar.
6. Evite acusações sem base, ataque pessoal gratuito e assuntos listados como proibidos.
7. Use no máximo 140 caracteres por pergunta.

REGRAS DE RESPOSTA OBRIGATÓRIAS
- Responda SOMENTE com as perguntas.
- Não escreva introdução, análise, explicação, saudação, resumo, fontes, títulos extras, markdown, numeração ou bullets.
- Não coloque texto antes nem depois da lista.
- Não use aspas nas perguntas.
- A resposta precisa estar pronta para copiar e colar diretamente no sistema.
- Escreva uma pergunta por linha.
- Cada linha deve seguir exatamente este formato: [Tema] Pergunta?

Formato de saída:
[Tema] Pergunta?`;
}

function buildStarterQuestions(interview: Interview) {
  const themes = interview.temas
    .split(/[,;\n]+/)
    .map((item) => item.trim())
    .filter(Boolean);
  const mainTheme = themes[0] || "Carreira";
  const name = interview.nome;

  return [
    `[${mainTheme}] ${name}, qual foi o momento em que você quase desistiu e ninguém percebeu?`,
    `[${mainTheme}] Qual decisão da sua carreira você tomaria de novo, mesmo sabendo o preço que pagou?`,
    `[${mainTheme}] O que as pessoas elogiam em você, mas não sabem o quanto custou nos bastidores?`,
    `[${mainTheme}] Qual pergunta você acha que todo mundo tem vontade de te fazer, mas evita?`,
    "[Bastidores] Qual bastidor da sua trajetória daria um corte forte para as redes sociais?",
    "[Bastidores] Qual foi o maior erro que virou aprendizado real?",
    "[Opinião] Que assunto todo mundo comenta, mas pouca gente tem coragem de falar com sinceridade?",
    "[Confronto] O que você responderia para quem duvida do seu trabalho?",
    "[Emocional] Qual memória ainda te emociona quando você fala sobre sua caminhada?",
    "[Viral] Se esse corte viralizar amanhã, qual frase você quer que fique marcada?",
  ];
}

function parseQuestionLine(line: string, fallbackTema: string) {
  const cleaned = line
    .trim()
    .replace(/^(?:[-*•]\s*|\d+[.)]\s*)/, "")
    .replace(/^["'“”]+|["'“”]+$/g, "")
    .trim();

  if (!cleaned) return null;
  if (/^(claro|segue|aqui est[aã]o|perfeito|lista de perguntas|perguntas prontas)\b/i.test(cleaned)) {
    return null;
  }

  const match = cleaned.match(/^\[([^\]]{2,50})\]\s*(.+)$/);
  const temaLine = match?.[1]?.trim() || fallbackTema;
  const titulo = (match?.[2] || cleaned).trim();

  if (!titulo) return null;
  return { tema: temaLine, titulo };
}

function appendVoiceText(currentValue: string, transcript: string) {
  const cleanTranscript = transcript.trim();
  if (!cleanTranscript) return currentValue;
  if (!currentValue.trim()) return cleanTranscript;

  const separator = currentValue.includes("\n") || currentValue.length > 90 ? "\n" : " ";
  return `${currentValue.trimEnd()}${separator}${cleanTranscript}`;
}

function getVoiceErrorMessage(error: string) {
  const messages: Record<string, string> = {
    "not-allowed": "Microfone bloqueado. Clique no cadeado do navegador e permita o microfone para este site.",
    "service-not-allowed": "O navegador bloqueou o serviço de voz. Use Chrome ou Edge atualizado e permita o microfone.",
    "no-speech": "Não ouvi nenhuma fala. Aperte o microfone de novo e fale mais perto do aparelho.",
    "audio-capture": "Não encontrei microfone ativo. Verifique se o microfone do notebook/celular está ligado.",
    network: "A transcrição de voz precisa de conexão ativa no navegador. Verifique a internet e tente novamente.",
    aborted: "Áudio interrompido.",
  };

  return messages[error] || "Não consegui captar o áudio. Verifique a permissão do microfone.";
}

function VoiceField({
  as = "input",
  className,
  defaultValue = "",
  listeningField,
  name,
  placeholder,
  required,
  startVoice,
  stopVoice,
}: VoiceFieldProps) {
  const [value, setValue] = useState(defaultValue);
  const isListening = listeningField === name;
  const Element = as;

  return (
    <label className={`sorteio-voice-field ${className || ""}`}>
      <Element
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button
        aria-label={isListening ? `Parar áudio em ${placeholder}` : `Falar em ${placeholder}`}
        className={isListening ? "is-listening" : ""}
        onClick={() => (isListening ? stopVoice() : startVoice(name, value, setValue))}
        title={isListening ? "Parar áudio" : "Falar neste campo"}
        type="button"
      >
        {isListening ? <Square size={18} /> : <Mic size={18} />}
      </button>
    </label>
  );
}

export function SorteioApp() {
  const [step, setStep] = useState<Step>("entrevista");
  const [interview, setInterview] = useState<Interview | null>(null);
  const [questions, setQuestions] = useState<QuestionCard[]>([]);
  const [tema, setTema] = useState(defaultThemes[0]);
  const [customTema, setCustomTema] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [drawnIds, setDrawnIds] = useState<string[]>([]);
  const [current, setCurrent] = useState<QuestionCard | null>(null);
  const [tvOpen, setTvOpen] = useState(false);
  const [status, setStatus] = useState("Pronto");
  const [copied, setCopied] = useState(false);
  const [listeningField, setListeningField] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const recognitionRef = useRef<InstanceType<SpeechRecognitionConstructor> | null>(null);

  const themes = useMemo(() => {
    const all = [...defaultThemes, ...questions.map((question) => question.tema)];
    if (interview?.temas) {
      all.push(...interview.temas.split(/[,;\n]+/).map((item) => item.trim()).filter(Boolean));
    }
    return [...new Set(all)];
  }, [interview, questions]);

  const filtered = useMemo(
    () => questions.filter((question) => question.tema === tema),
    [questions, tema],
  );

  const grokPrompt = useMemo(() => (interview ? buildGrokPrompt(interview) : ""), [interview]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const data = JSON.parse(raw) as {
        interview?: Interview;
        questions?: QuestionCard[];
        tema?: string;
      };
      window.requestAnimationFrame(() => {
        setInterview(data.interview || null);
        setQuestions(data.questions || []);
        setTema(data.tema || defaultThemes[0]);
      });
    } catch {
      window.requestAnimationFrame(() => setStatus("Não foi possível carregar dados salvos."));
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ interview, questions, tema }));
    } catch {
      window.requestAnimationFrame(() =>
        setStatus("Perguntas criadas para esta sessão. O navegador não conseguiu salvar tudo porque as imagens ficaram pesadas."),
      );
    }
  }, [interview, questions, tema]);

  function saveInterview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const data: Interview = {
      nome: String(form.get("nome") || "").trim(),
      estilo: String(form.get("estilo") || "").trim(),
      links: String(form.get("links") || "").trim(),
      resumo: String(form.get("resumo") || "").trim(),
      objetivo: String(form.get("objetivo") || "").trim(),
      temas: String(form.get("temas") || "").trim(),
      temasProibidos: String(form.get("temasProibidos") || "").trim(),
      observacoes: String(form.get("observacoes") || "").trim(),
      criadoEm: new Date().toISOString(),
    };

    if (!data.nome) {
      setStatus("Informe o nome do entrevistado.");
      return;
    }

    setInterview(data);
    setCopied(false);
    setStatus(`Base salva e prompt gerado para ${data.nome}.`);
    setStep("entrevista");
  }

  async function copyGrokPrompt() {
    if (!grokPrompt) {
      setStatus("Salve a base da entrevista primeiro.");
      return;
    }

    await navigator.clipboard.writeText(grokPrompt);
    setCopied(true);
    setStatus("Prompt copiado para o Grok.");
  }

  function stopVoice() {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setListeningField(null);
  }

  async function requestMicrophoneAccess() {
    if (!navigator.mediaDevices?.getUserMedia) return true;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      return true;
    } catch (error) {
      const name = error instanceof DOMException ? error.name : "";
      if (name === "NotAllowedError" || name === "PermissionDeniedError") {
        setStatus("Microfone bloqueado. Clique no cadeado do navegador e permita o microfone para este site.");
      } else if (name === "NotFoundError" || name === "DevicesNotFoundError") {
        setStatus("Não encontrei microfone ativo neste aparelho.");
      } else if (name === "NotReadableError" || name === "TrackStartError") {
        setStatus("O microfone está em uso por outro aplicativo. Feche o outro app e tente novamente.");
      } else {
        setStatus("Não consegui abrir o microfone. Verifique a permissão do navegador.");
      }
      return false;
    }
  }

  async function startVoice(fieldName: string, currentValue: string, setValue: (value: string) => void) {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      setStatus("Este navegador não liberou ditado por voz. Use Chrome ou Edge atualizado.");
      return;
    }

    stopVoice();
    setStatus("Pedindo permissão do microfone...");
    const hasMicrophone = await requestMicrophoneAccess();
    if (!hasMicrophone) return;

    const recognition = new Recognition();
    recognition.lang = "pt-BR";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;
    setListeningField(fieldName);
    setStatus("Ouvindo... fale agora.");

    let finalTranscript = "";
    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const transcript = event.results[index][0]?.transcript || "";
        if (event.results[index].isFinal) {
          finalTranscript = `${finalTranscript} ${transcript}`.trim();
        } else {
          interimTranscript = `${interimTranscript} ${transcript}`.trim();
        }
      }

      setValue(appendVoiceText(currentValue, `${finalTranscript} ${interimTranscript}`));
      setStatus(interimTranscript ? "Ouvindo e escrevendo..." : "Texto inserido por áudio.");
    };

    recognition.onerror = (event) => {
      setStatus(getVoiceErrorMessage(event.error));
      setListeningField(null);
      recognitionRef.current = null;
    };

    recognition.onend = () => {
      setListeningField(null);
      recognitionRef.current = null;
    };

    try {
      recognition.start();
    } catch {
      setStatus("Não foi possível iniciar o microfone agora.");
      setListeningField(null);
      recognitionRef.current = null;
    }
  }

  async function generateImage(text: string, index: number) {
    const canvas = canvasRef.current;
    if (!canvas) throw new Error("Canvas não encontrado.");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas não suportado.");

    const width = canvas.width;
    const height = canvas.height;
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#050505");
    gradient.addColorStop(0.46, "#31140f");
    gradient.addColorStop(1, "#050505");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "rgba(240, 208, 107, 0.12)";
    ctx.beginPath();
    ctx.arc(1680, 140, 360, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(160, 920, 280, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(240, 208, 107, 0.76)";
    ctx.lineWidth = 5;
    roundRect(ctx, 80, 70, width - 160, height - 140, 26);
    ctx.stroke();

    ctx.fillStyle = "#f0d06b";
    ctx.font = "900 58px Arial";
    ctx.textAlign = "left";
    ctx.fillText("CAFÉ COM", 150, 170);
    ctx.font = "900 118px Arial";
    ctx.fillText("ZÁKIA", 150, 292);

    ctx.fillStyle = "rgba(0, 0, 0, 0.78)";
    roundRect(ctx, 150, 360, width - 300, 470, 22);
    ctx.fill();
    ctx.strokeStyle = "rgba(240, 208, 107, 0.58)";
    ctx.lineWidth = 3;
    roundRect(ctx, 150, 360, width - 300, 470, 22);
    ctx.stroke();

    const fitted = fitText(ctx, text, width - 440, 340);
    ctx.font = `900 ${fitted.size}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "#000";
    ctx.shadowBlur = 12;

    const lineHeight = fitted.size * 1.16;
    let y = 595 - ((fitted.lines.length - 1) * lineHeight) / 2;
    for (const line of fitted.lines) {
      ctx.strokeStyle = "#000";
      ctx.lineWidth = Math.max(5, fitted.size * 0.08);
      ctx.strokeText(line, width / 2, y);
      ctx.fillText(line, width / 2, y);
      y += lineHeight;
    }

    ctx.shadowBlur = 0;
    ctx.textAlign = "left";
    ctx.fillStyle = "#f0d06b";
    ctx.font = "900 38px Arial";
    ctx.fillText(`PERGUNTA ${index}`, 150, 940);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff6d4";
    ctx.fillText("cafecomzakia.com.br", width - 150, 940);

    return canvas.toDataURL("image/jpeg", 0.82);
  }

  async function createCardsFromLines(lines: string[], sourceTema = tema) {
    if (!interview) {
      setStatus("Prepare a entrevista antes de criar perguntas.");
      setStep("entrevista");
      return;
    }

    const parsedLines = lines
      .map((line) => parseQuestionLine(line, sourceTema))
      .filter((line): line is { tema: string; titulo: string } => Boolean(line));

    if (!parsedLines.length) {
      setStatus("Cole pelo menos uma pergunta.");
      return;
    }

    setStatus("Criando imagens...");
    const created: QuestionCard[] = [];
    for (let index = 0; index < parsedLines.length; index += 1) {
      const item = parsedLines[index];
      created.push({
        id: createId(),
        tema: item.tema,
        titulo: item.titulo,
        image: await generateImage(item.titulo, questions.length + index + 1),
        origem: "texto",
        criadoEm: new Date().toISOString(),
      });
    }

    setQuestions((items) => [...created, ...items]);
    if (created[0]) setTema(created[0].tema);
    setQuestionText("");
    setStatus(`${created.length} pergunta(s) criada(s).`);
    setStep("banco");
  }

  async function createCards() {
    const lines = questionText
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean);

    await createCardsFromLines(lines);
  }

  async function createAutomaticQuestions() {
    if (!interview) {
      setStatus("Salve a base da entrevista primeiro.");
      return;
    }

    const automaticQuestions = buildStarterQuestions(interview);
    const firstTheme = automaticQuestions[0]?.match(/^\[([^\]]+)\]/)?.[1] || tema;
    setTema(firstTheme);
    await createCardsFromLines(automaticQuestions, firstTheme);
    setStatus(`${automaticQuestions.length} perguntas automáticas criadas no site.`);
  }

  async function importImages(event: ChangeEvent<HTMLInputElement>) {
    const files = [...(event.target.files || [])].filter((file) => file.type.startsWith("image/"));
    if (!files.length) return;
    if (!interview) {
      setStatus("Prepare a entrevista antes de importar imagens.");
      setStep("entrevista");
      return;
    }

    const imported: QuestionCard[] = [];
    for (const file of files) {
      imported.push({
        id: createId(),
        tema,
        titulo: file.name.replace(/\.[^.]+$/, ""),
        image: await fileToDataUrl(file),
        origem: "imagem",
        criadoEm: new Date().toISOString(),
      });
    }

    setQuestions((items) => [...imported, ...items]);
    setStatus(`${imported.length} imagem(ns) importada(s).`);
    setStep("banco");
    event.target.value = "";
  }

  function addTheme() {
    const next = customTema.trim();
    if (!next) return;
    setTema(next);
    setCustomTema("");
  }

  function drawQuestion(openTv = false) {
    if (!filtered.length) {
      setStatus("Esse tema ainda não tem perguntas.");
      setStep("perguntas");
      return;
    }

    const available = filtered.filter((question) => !drawnIds.includes(question.id));
    const pool = available.length ? available : filtered;
    const picked = pool[Math.floor(Math.random() * pool.length)];
    setCurrent(picked);
    setDrawnIds((ids) => (available.length ? [...ids, picked.id] : [picked.id]));
    setStep("sorteio");
    setStatus(`Pergunta sorteada: ${picked.titulo}`);
    if (openTv) setTvOpen(true);
  }

  function newInterview() {
    setInterview(null);
    setQuestions([]);
    setDrawnIds([]);
    setCurrent(null);
    setQuestionText("");
    setCopied(false);
    setStep("entrevista");
    setStatus("Nova entrevista iniciada.");
  }

  function removeQuestion(id: string) {
    setQuestions((items) => items.filter((item) => item.id !== id));
    if (current?.id === id) setCurrent(null);
  }

  return (
    <main className="sorteio-page">
      <header className="sorteio-header">
        <Link href="/jogos">Voltar para jogos</Link>
        <div>
          <p>Sorteio de Perguntas</p>
          <h1>Café com Zákia</h1>
        </div>
        <button onClick={newInterview} type="button">
          Nova entrevista
        </button>
      </header>

      <div className="sorteio-shell">
        <aside className="sorteio-sidebar">
          <strong>{interview ? interview.nome : "Nenhuma entrevista ativa"}</strong>
          <span>{status}</span>

          <nav>
            {[
              ["entrevista", "1. Entrevista"],
              ["perguntas", "2. Perguntas"],
              ["banco", "3. Banco"],
              ["sorteio", "4. Sorteio TV"],
            ].map(([value, label]) => (
              <button
                className={step === value ? "active" : ""}
                key={value}
                onClick={() => setStep(value as Step)}
                type="button"
              >
                {label}
              </button>
            ))}
          </nav>

          <label>
            Tema atual
            <select value={tema} onChange={(event) => setTema(event.target.value)}>
              {themes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <div className="sorteio-theme-row">
            <input
              placeholder="Novo tema"
              value={customTema}
              onChange={(event) => setCustomTema(event.target.value)}
            />
            <button onClick={addTheme} type="button">
              +
            </button>
          </div>
        </aside>

        <section className="sorteio-content">
          {step === "entrevista" ? (
            <form
              className="sorteio-card sorteio-form"
              key={interview?.criadoEm || "nova-entrevista"}
              onSubmit={saveInterview}
            >
              <h2>Preparar entrevista</h2>
              <VoiceField
                defaultValue={interview?.nome || ""}
                listeningField={listeningField}
                name="nome"
                placeholder="Nome do entrevistado"
                required
                startVoice={startVoice}
                stopVoice={stopVoice}
              />
              <select name="estilo" defaultValue={interview?.estilo || "Polêmica viral"}>
                <option>Polêmica viral</option>
                <option>Confronto direto</option>
                <option>Emocional e humana</option>
                <option>Carreira e bastidores</option>
                <option>Leve com cortes virais</option>
              </select>
              <VoiceField
                as="textarea"
                className="span-all"
                defaultValue={interview?.links || ""}
                listeningField={listeningField}
                name="links"
                placeholder="Links das redes, site e entrevistas anteriores"
                startVoice={startVoice}
                stopVoice={stopVoice}
              />
              <VoiceField
                as="textarea"
                defaultValue={interview?.resumo || ""}
                listeningField={listeningField}
                name="resumo"
                placeholder="Resumo sobre a pessoa"
                startVoice={startVoice}
                stopVoice={stopVoice}
              />
              <VoiceField
                as="textarea"
                defaultValue={interview?.objetivo || ""}
                listeningField={listeningField}
                name="objetivo"
                placeholder="Objetivo da conversa"
                startVoice={startVoice}
                stopVoice={stopVoice}
              />
              <VoiceField
                className="span-all"
                defaultValue={interview?.temas || ""}
                listeningField={listeningField}
                name="temas"
                placeholder="Temas principais: segurança, corrupção, carreira..."
                startVoice={startVoice}
                stopVoice={stopVoice}
              />
              <VoiceField
                className="span-all"
                defaultValue={interview?.temasProibidos || ""}
                listeningField={listeningField}
                name="temasProibidos"
                placeholder="Temas proibidos/delicados, se tiver"
                startVoice={startVoice}
                stopVoice={stopVoice}
              />
              <VoiceField
                as="textarea"
                className="span-all"
                defaultValue={interview?.observacoes || ""}
                listeningField={listeningField}
                name="observacoes"
                placeholder="Observações livres para orientar a entrevista"
                startVoice={startVoice}
                stopVoice={stopVoice}
              />
              <button className="sorteio-primary" type="submit">
                Salvar base e gerar prompt do Grok
              </button>
              {grokPrompt ? (
                <div className="sorteio-prompt-box">
                  <div>
                    <h3>Prompt pronto para o Grok</h3>
                  <button className="sorteio-secondary" onClick={copyGrokPrompt} type="button">
                      {copied ? "Prompt copiado" : "Copiar prompt"}
                    </button>
                  </div>
                  <textarea readOnly value={grokPrompt} />
                  <div className="sorteio-prompt-actions">
                    <button className="sorteio-primary" onClick={createAutomaticQuestions} type="button">
                      Criar perguntas automáticas no site
                    </button>
                    <button className="sorteio-secondary" onClick={() => setStep("perguntas")} type="button">
                      Colar resposta do Grok manualmente
                    </button>
                  </div>
                </div>
              ) : null}
            </form>
          ) : null}

          {step === "perguntas" ? (
            <div className="sorteio-card">
              <h2>Criar ou importar perguntas</h2>
              <label className="sorteio-voice-field sorteio-question-voice">
                <textarea
                  className="sorteio-question-input"
                  placeholder="Cole aqui a resposta do Grok. Use uma por linha: [Tema] Pergunta?"
                  value={questionText}
                  onChange={(event) => setQuestionText(event.target.value)}
                />
                <button
                  aria-label={listeningField === "questionText" ? "Parar áudio nas perguntas" : "Falar perguntas"}
                  className={listeningField === "questionText" ? "is-listening" : ""}
                  onClick={() =>
                    listeningField === "questionText"
                      ? stopVoice()
                      : startVoice("questionText", questionText, setQuestionText)
                  }
                  title={listeningField === "questionText" ? "Parar áudio" : "Falar perguntas"}
                  type="button"
                >
                  {listeningField === "questionText" ? <Square size={18} /> : <Mic size={18} />}
                </button>
              </label>
              <div className="sorteio-actions-row">
                <button className="sorteio-primary" onClick={createCards} type="button">
                  Criar imagens
                </button>
                <label className="sorteio-upload">
                  Importar imagens
                  <input accept="image/*" multiple onChange={importImages} type="file" />
                </label>
              </div>
            </div>
          ) : null}

          {step === "banco" ? (
            <div className="sorteio-card">
              <div className="sorteio-card-title">
                <h2>Banco de perguntas</h2>
                <span>{filtered.length} no tema atual</span>
              </div>
              <div className="sorteio-grid">
                {filtered.map((question) => (
                  <article key={question.id}>
                    <img src={question.image} alt={question.titulo} />
                    <strong>{question.titulo}</strong>
                    <div>
                      <button
                        onClick={() => {
                          setCurrent(question);
                          setStep("sorteio");
                        }}
                        type="button"
                      >
                        Preview
                      </button>
                      <button onClick={() => removeQuestion(question.id)} type="button">
                        Remover
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          {step === "sorteio" ? (
            <div className="sorteio-card">
              <div className="sorteio-card-title">
                <h2>Sorteio na TV</h2>
                <span>{filtered.length} pergunta(s) disponíveis</span>
              </div>
              <div className="sorteio-preview">
                {current ? (
                  <img src={current.image} alt={current.titulo} />
                ) : (
                  <div>
                    <strong>Pronto para sortear</strong>
                    <span>Escolha um tema e clique em sortear.</span>
                  </div>
                )}
              </div>
              <div className="sorteio-actions-row">
                <button className="sorteio-primary" onClick={() => drawQuestion(false)} type="button">
                  Sortear próxima
                </button>
                <button className="sorteio-secondary" onClick={() => setTvOpen(true)} type="button">
                  Abrir modo TV
                </button>
              </div>
            </div>
          ) : null}
        </section>
      </div>

      {tvOpen ? (
        <section className="sorteio-tv">
          {current ? <img src={current.image} alt={current.titulo} /> : null}
          <div>
            <button onClick={() => drawQuestion(true)} type="button">
              Nova pergunta
            </button>
            <button onClick={() => setTvOpen(false)} type="button">
              Voltar
            </button>
          </div>
        </section>
      ) : null}

      <canvas height={1080} hidden ref={canvasRef} width={1920} />
    </main>
  );
}
