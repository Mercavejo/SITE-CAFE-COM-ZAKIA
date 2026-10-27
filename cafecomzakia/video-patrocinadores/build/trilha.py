"""Trilha original do vídeo "Café com Zákia — Patrocinadores (15 s)".

Gerada 100% por código (numpy), sem samples externos, com semente fixa: rodar de novo
produz o mesmo arquivo, amostra por amostra.

  python3 -I build/trilha.py        (a partir da raiz do projeto)

Saídas (assets/audio/):
  trilha-musica.wav   stem da música (bateria, baixo, piano elétrico, pad, textura)
  trilha-sfx.wav      stem do design de som (impactos, whooshes, cliques, riser, xícara)
  trilha-premix.wav   soma dos stems, antes da normalização
Depois rode build/master.sh: ele gera trilha-original-master.wav (-14 LUFS, pico verdadeiro
<= -1.5 dBTP), converte os stems para .flac e apaga o premix.

Andamento 120 BPM: 1 batida = 0,5 s = 30 quadros a 60 fps. As trocas de cena
(0 / 1,5 / 4 / 7 / 10 / 12,5 s) caem exatamente em batidas.
"""
import numpy as np, wave, os

SEED = 20261027
SR = 48000
DUR = 15.0
BPM = 120
BEAT = 60 / BPM          # 0,5 s
STEP = BEAT / 4          # semicolcheia 0,125 s
N = int(SR * DUR)
rng = np.random.default_rng(SEED)

music = np.zeros((N, 2))
sfx = np.zeros((N, 2))


def mtof(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def place(buf, sig, t, gain=1.0, pan=0.0):
    """Soma um sinal mono (ou estéreo) em buf a partir de t segundos. pan -1..1."""
    i = int(round(t * SR))
    if i >= N:
        return
    if sig.ndim == 1:
        l = np.cos((pan + 1) * np.pi / 4)
        r = np.sin((pan + 1) * np.pi / 4)
        sig = np.stack([sig * l * 1.414, sig * r * 1.414], axis=1)
    j = min(N, i + len(sig))
    if i < 0:
        sig = sig[-i:]
        i = 0
    buf[i:j] += sig[: j - i] * gain


def onepole_lp(x, fc):
    a = np.exp(-2 * np.pi * fc / SR)
    y = np.empty_like(x)
    z = 0.0
    for k in range(len(x)):
        z = (1 - a) * x[k] + a * z
        y[k] = z
    return y


def lp_sweep(x, f0, f1):
    """Passa-baixas de um polo com corte variando exponencialmente de f0 a f1."""
    fc = f0 * (f1 / f0) ** np.linspace(0, 1, len(x))
    a = np.exp(-2 * np.pi * fc / SR)
    y = np.empty_like(x)
    z = 0.0
    for k in range(len(x)):
        z = (1 - a[k]) * x[k] + a[k] * z
        y[k] = z
    return y


def hp(x, fc):
    return x - onepole_lp(x, fc)


def env_exp(n, tau):
    return np.exp(-np.arange(n) / (tau * SR))


def att(n, a):
    e = np.ones(n)
    k = max(1, int(a * SR))
    e[:k] = np.linspace(0, 1, k)
    return e


# ---------------------------------------------------------------- bateria
def kick(vel=1.0):
    n = int(0.45 * SR)
    t = np.arange(n) / SR
    f = 46 + 70 * np.exp(-t / 0.035)
    ph = 2 * np.pi * np.cumsum(f) / SR
    body = np.sin(ph) * env_exp(n, 0.16)
    click = hp(rng.standard_normal(n) * env_exp(n, 0.003), 2500) * 0.25
    return np.tanh((body + click) * 1.4) * vel


def rim(vel=1.0):
    n = int(0.25 * SR)
    t = np.arange(n) / SR
    nz = rng.standard_normal(n)
    bp = hp(onepole_lp(nz, 3800), 900)
    e = np.zeros(n)
    for off in (0.0, 0.008, 0.017):  # palmas em 3 micro-rajadas
        k = int(off * SR)
        e[k:] += env_exp(n - k, 0.012 if off < 0.017 else 0.07)
    tone = np.sin(2 * np.pi * 205 * t) * env_exp(n, 0.04) * 0.35
    return (bp * e * 0.9 + tone) * vel


def hat(vel=1.0, open_=False):
    n = int((0.22 if open_ else 0.05) * SR)
    nz = rng.standard_normal(n)
    x = hp(hp(nz, 6500), 6500)
    return x * env_exp(n, 0.07 if open_ else 0.012) * vel * 0.5


def shaker(vel=1.0):
    n = int(0.09 * SR)
    x = hp(onepole_lp(rng.standard_normal(n), 9000), 3500)
    e = np.sin(np.linspace(0, np.pi, n)) ** 2
    return x * e * vel * 0.25


# ---------------------------------------------------------------- harmonia
# Acordes por compasso (2 s): baixo + vozes do piano elétrico (MIDI)
CHORDS = {
    "Am9": (45, [60, 64, 67, 71]),
    "Fmaj9": (41, [57, 60, 64, 67]),
    "Cmaj9": (48, [59, 62, 64, 67]),
    "G69": (43, [59, 62, 64, 69]),
    "Dm9": (50, [60, 64, 65, 69]),
}
# (início, fim, acorde)
PROG = [
    (0.0, 2.0, "Am9"), (2.0, 4.0, "Fmaj9"), (4.0, 6.0, "Cmaj9"), (6.0, 8.0, "G69"),
    (8.0, 10.0, "Am9"), (10.0, 12.0, "Fmaj9"), (12.0, 12.5, "Dm9"), (12.5, 15.0, "Am9"),
]


def chord_at(t):
    for a, b, c in PROG:
        if a <= t < b:
            return CHORDS[c]
    return CHORDS["Am9"]


def epiano(midi, dur, vel=1.0):
    """Piano elétrico por FM (razão 1:1, índice decaindo) + leve trêmolo."""
    n = int((dur + 0.6) * SR)
    t = np.arange(n) / SR
    f = mtof(midi)
    idx = 2.2 * np.exp(-t / 0.18) + 0.25
    mod = np.sin(2 * np.pi * f * t) * idx
    car = np.sin(2 * np.pi * f * t + mod)
    tine = np.sin(2 * np.pi * f * 7.0 * t) * np.exp(-t / 0.03) * 0.15
    e = env_exp(n, 0.9) * att(n, 0.004)
    rel = int(dur * SR)
    e[rel:] *= np.exp(-np.arange(n - rel) / (0.12 * SR))
    trem = 1 + 0.08 * np.sin(2 * np.pi * 4.5 * t)
    return (car + tine) * e * trem * vel * 0.16


def bass(midi, dur, vel=1.0):
    n = int((dur + 0.08) * SR)
    t = np.arange(n) / SR
    f = mtof(midi)
    x = np.sin(2 * np.pi * f * t) + 0.22 * np.sin(2 * np.pi * 2 * f * t) + 0.08 * np.sin(2 * np.pi * 3 * f * t)
    e = att(n, 0.006) * np.exp(-t / 0.9)
    k = int(dur * SR)
    e[k:] *= np.exp(-np.arange(n - k) / (0.02 * SR))
    return np.tanh(x * 1.3) * e * vel * 0.42


def pad(midis, dur, vel=1.0):
    n = int(dur * SR)
    t = np.arange(n) / SR
    x = np.zeros(n)
    for m in midis:
        for det in (-0.07, 0.07):
            f = mtof(m + det)
            for h in range(1, 7):
                x += np.sin(2 * np.pi * f * h * t + rng.uniform(0, 6.28)) / (h * 1.6)
    x = onepole_lp(x, 1400)
    a = int(min(0.5, dur / 3) * SR)
    e = np.ones(n)
    e[:a] = np.linspace(0, 1, a)
    e[-a:] *= np.linspace(1, 0, a)
    return x * e * vel * 0.012


# ---------------------------------------------------------------- design de som
def impact(vel=1.0, sub=48):
    n = int(1.6 * SR)
    t = np.arange(n) / SR
    f = sub * (1 + 0.6 * np.exp(-t / 0.08))
    boom = np.sin(2 * np.pi * np.cumsum(f) / SR) * env_exp(n, 0.45)
    nz = onepole_lp(rng.standard_normal(n), 1800) * env_exp(n, 0.09) * 0.6
    return np.tanh((boom + nz) * 1.2) * vel


def whoosh(dur, peak_frac=0.75, vel=1.0, f0=300, f1=5500):
    n = int(dur * SR)
    x = rng.standard_normal(n)
    pk = int(peak_frac * n)
    e = np.concatenate([np.linspace(0, 1, pk) ** 2.2, np.linspace(1, 0, n - pk) ** 1.4])
    up = lp_sweep(x[:pk], f0, f1)
    dn = lp_sweep(x[pk:], f1, f0 * 1.5)
    y = hp(np.concatenate([up, dn]), 180) * e
    return y * vel * 0.55


def click(vel=1.0):
    n = int(0.03 * SR)
    x = hp(rng.standard_normal(n), 3000) * env_exp(n, 0.0025)
    t = np.arange(n) / SR
    x += np.sin(2 * np.pi * 1800 * t) * env_exp(n, 0.004) * 0.4
    return x * vel


def tok(vel=1.0, f=820):
    """Batida de madeira curta — usada quando um número aterrissa."""
    n = int(0.12 * SR)
    t = np.arange(n) / SR
    x = (np.sin(2 * np.pi * f * t) + 0.5 * np.sin(2 * np.pi * f * 2.7 * t)) * env_exp(n, 0.025)
    return x * vel * 0.6


def cup(vel=1.0, base=2150):
    """Colher na xícara de porcelana: parciais inarmônicas com decaimentos distintos."""
    n = int(1.4 * SR)
    t = np.arange(n) / SR
    parts = [(1.0, 1.0, 0.55), (2.32, 0.5, 0.35), (4.25, 0.28, 0.2), (6.63, 0.15, 0.12)]
    x = sum(a * np.sin(2 * np.pi * base * r * t + rng.uniform(0, 6.28)) * env_exp(n, d) for r, a, d in parts)
    x += hp(rng.standard_normal(n), 4000) * env_exp(n, 0.002) * 0.3
    return x * vel * 0.12


def riser(dur, vel=1.0):
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = 180 * (7 ** (t / dur))
    tone = np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.25
    nz = lp_sweep(rng.standard_normal(n), 400, 9000) * 0.8
    e = (t / dur) ** 2.5
    return hp(tone + nz, 150) * e * vel * 0.5


# ---------------------------------------------------------------- arranjo
def steps(t0, t1):
    k0 = int(round(t0 / STEP))
    k1 = int(round(t1 / STEP))
    return [(k, k * STEP) for k in range(k0, k1)]


# Hats (0 – 15 s), com dinâmica humana (semente fixa)
for k, t in steps(0.0, 14.75):
    if 10.0 <= t < 12.5 and k % 2:  # respiro na cena 5
        continue
    accent = [0.9, 0.3, 0.6, 0.35][k % 4] * rng.uniform(0.85, 1.1)
    if t < 1.5:
        accent *= 0.55
    is_open = (k % 16 in (6, 14)) and 2.0 <= t < 10.0
    place(music, hat(accent, is_open), t + rng.normal(0, 0.002), 0.55, pan=0.25)
    if k % 2 == 1 and t >= 4.0:
        place(music, shaker(accent), t, 0.5, pan=-0.35)

# Kick: quatro no chão a partir do logo; sai na cena 5 (respiro) e volta no CTA
for b in range(30):
    t = b * BEAT
    if t < 1.5 or 10.0 <= t < 12.5 or t >= 14.75:
        continue
    place(music, kick(1.0 if b % 2 == 0 else 0.86), t, 0.9)
# Rim/palmas nos tempos 2 e 4 a partir da cena 3
for b in range(30):
    t = b * BEAT
    if b % 2 == 1 and 4.0 <= t < 10.0 or (b % 2 == 1 and 12.5 <= t < 14.75):
        place(music, rim(0.9), t, 0.55, pan=-0.05)
# Virada antes das métricas (6,5 → 7,0)
for i, (k, t) in enumerate(steps(6.5, 7.0)):
    place(music, rim(0.35 + 0.15 * i), t, 0.5, pan=0.1)

# Baixo
BASS_PAT = [(0, 3), (3, 1), (6, 2), (8, 3), (11, 1), (14, 2)]
for bar in range(8):
    t_bar = bar * 2.0
    for s, ln in BASS_PAT:
        t = t_bar + s * STEP
        if t < 1.5 or t >= 14.75:
            continue
        root, _ = chord_at(t + 0.001)
        m = root + (12 if s == 11 else 0)
        v = 0.75 if 10.0 <= t < 12.5 else 1.0
        place(music, bass(m, ln * STEP * 0.92, v), t, 1.0)

# Piano elétrico: estocadas no contratempo, com antecipações
STAB = [(2, 0.9), (6, 0.6), (10, 0.85), (13, 0.55)]
for bar in range(8):
    t_bar = bar * 2.0
    for s, v in STAB:
        t = t_bar + s * STEP
        if t >= 14.6:
            continue
        _, voices = chord_at(t + 0.001)
        for j, m in enumerate(voices):
            place(music, epiano(m, 0.22, v * rng.uniform(0.9, 1.05)), t + j * 0.006, 1.0, pan=-0.3 + j * 0.2)
# Acorde do gancho (0,0 s) e acorde final (12,5 s), sustentados
for t0, dur, name in [(0.0, 1.45, "Am9"), (12.5, 2.3, "Am9")]:
    _, voices = CHORDS[name]
    for j, m in enumerate(voices + [voices[0] + 12]):
        place(music, epiano(m, dur, 0.9), t0 + j * 0.008, 1.0, pan=-0.4 + j * 0.2)

# Pad de fundo seguindo a harmonia
for a, b, c in PROG:
    _, voices = CHORDS[c]
    place(music, pad([v - 12 for v in voices[:3]], b - a + 0.3), a, 1.0)

# Textura: ruído de sala bem baixo + estalos esparsos (semente fixa)
room = onepole_lp(rng.standard_normal(N), 900) * 0.006
music[:, 0] += room
music[:, 1] += np.roll(room, 377)
for t in np.sort(rng.uniform(0, 15, 26)):
    place(music, click(0.06), t, 1.0, pan=rng.uniform(-0.8, 0.8))

# ----------------------------------------------------------- SFX sincronizados
place(sfx, impact(1.0, 46), 0.0, 0.9)                           # gancho
place(sfx, whoosh(0.5, 0.82, 0.8), 1.5 - 0.41, 1.0, pan=-0.2)   # cena 1 → 2
place(sfx, cup(1.0, 2150), 1.52, 1.0, pan=0.35)                 # logo: xícara
place(sfx, whoosh(0.45, 0.8, 0.9, 250, 7000), 4.0 - 0.36, 1.0, pan=0.25)  # cena 2 → 3 (zoom)
place(sfx, click(0.5), 5.0, 1.0, pan=-0.3)                      # corte convidado 2
place(sfx, click(0.5), 6.0, 1.0, pan=0.3)                       # corte convidado 3
place(sfx, impact(0.75, 52), 7.0, 0.8)                          # entrada das métricas
place(sfx, tok(0.8, 820), 7.62, 1.0, pan=-0.1)                  # "6" aterrissa
place(sfx, tok(0.8, 690), 8.36, 1.0, pan=0.1)                   # "1 milhão" aterrissa
place(sfx, whoosh(0.55, 0.78, 0.7, 350, 4500), 10.0 - 0.43, 1.0, pan=-0.25)  # cena 4 → 5
place(sfx, click(0.35), 10.62, 1.0, pan=0.2)                    # placa "SUA MARCA" encaixa
place(sfx, riser(0.5, 0.9), 12.0, 1.0)                          # riser curto
place(sfx, impact(1.0, 44), 12.5, 0.95)                         # CTA
place(sfx, cup(0.8, 2380), 12.55, 1.0, pan=-0.35)               # xícara no logo final

# ----------------------------------------------------------- reverb (FFT)
def reverb(x, secs=1.6, mix=0.18):
    n = int(secs * SR)
    ir = rng.standard_normal((n, 2)) * env_exp(n, secs / 5)[:, None]
    ir[:, 0] = onepole_lp(ir[:, 0], 5000)
    ir[:, 1] = onepole_lp(ir[:, 1], 5000)
    ir /= np.sqrt((ir ** 2).sum(axis=0))
    L = 1 << int(np.ceil(np.log2(len(x) + n)))
    y = np.fft.irfft(np.fft.rfft(x, L, axis=0) * np.fft.rfft(ir, L, axis=0), L, axis=0)[: len(x)]
    return x + y * mix


music = reverb(music, 1.8, 0.22)
sfx = reverb(sfx, 1.4, 0.15)

# Fade final curto (14,7 → 15,0) e entrada sem clique
fade = np.ones(N)
k = int(14.7 * SR)
fade[k:] = np.linspace(1, 0, N - k) ** 1.5
fade[: int(0.003 * SR)] = np.linspace(0, 1, int(0.003 * SR))
music *= fade[:, None]
sfx *= fade[:, None]


def write(path, x, peak_db=-3.0):
    x = x / max(1e-9, np.abs(x).max()) * 10 ** (peak_db / 20) if peak_db is not None else x
    pcm = np.clip(x, -1, 1)
    pcm = (pcm * 32767 + rng.uniform(-0.5, 0.5, pcm.shape)).astype("<i2")
    with wave.open(path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())


os.makedirs("assets/audio", exist_ok=True)
# Balanço entre stems: SFX ~4 dB acima da cama nos acertos
mix_music = music * 0.62
mix_sfx = sfx * 0.85
pre = mix_music + mix_sfx
g = 10 ** (-3 / 20) / np.abs(pre).max()
write("assets/audio/trilha-musica.wav", mix_music * g, None)
write("assets/audio/trilha-sfx.wav", mix_sfx * g, None)
write("assets/audio/trilha-premix.wav", pre * g, None)
print("ok", N / SR, "s")
