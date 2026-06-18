"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

type Step = "entrevista" | "perguntas" | "banco" | "sorteio";

type Interview = {
  nome: string;
  estilo: string;
  links: string;
  resumo: string;
  objetivo: string;
  temas: string;
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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
    localStorage.setItem(storageKey, JSON.stringify({ interview, questions, tema }));
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
      criadoEm: new Date().toISOString(),
    };

    if (!data.nome) {
      setStatus("Informe o nome do entrevistado.");
      return;
    }

    setInterview(data);
    setStatus(`Entrevista preparada: ${data.nome}`);
    setStep("perguntas");
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

    return canvas.toDataURL("image/png");
  }

  async function createCards() {
    if (!interview) {
      setStatus("Prepare a entrevista antes de criar perguntas.");
      setStep("entrevista");
      return;
    }

    const lines = questionText
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (!lines.length) {
      setStatus("Cole pelo menos uma pergunta.");
      return;
    }

    setStatus("Criando imagens...");
    const created: QuestionCard[] = [];
    for (let index = 0; index < lines.length; index += 1) {
      const title = lines[index];
      created.push({
        id: createId(),
        tema,
        titulo: title,
        image: await generateImage(title, questions.length + index + 1),
        origem: "texto",
        criadoEm: new Date().toISOString(),
      });
    }

    setQuestions((items) => [...created, ...items]);
    setQuestionText("");
    setStatus(`${created.length} pergunta(s) criada(s).`);
    setStep("banco");
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
            <form className="sorteio-card sorteio-form" onSubmit={saveInterview}>
              <h2>Preparar entrevista</h2>
              <input name="nome" placeholder="Nome do entrevistado" required />
              <select name="estilo" defaultValue="Polêmica viral">
                <option>Polêmica viral</option>
                <option>Confronto direto</option>
                <option>Emocional e humana</option>
                <option>Carreira e bastidores</option>
                <option>Leve com cortes virais</option>
              </select>
              <textarea name="links" placeholder="Links das redes, site e entrevistas anteriores" />
              <textarea name="resumo" placeholder="Resumo sobre a pessoa" />
              <textarea name="objetivo" placeholder="Objetivo da conversa" />
              <input name="temas" placeholder="Temas principais separados por vírgula" />
              <button className="sorteio-primary" type="submit">
                Salvar base e avançar
              </button>
            </form>
          ) : null}

          {step === "perguntas" ? (
            <div className="sorteio-card">
              <h2>Criar ou importar perguntas</h2>
              <textarea
                className="sorteio-question-input"
                placeholder="Cole perguntas do Grok, uma por linha."
                value={questionText}
                onChange={(event) => setQuestionText(event.target.value)}
              />
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
