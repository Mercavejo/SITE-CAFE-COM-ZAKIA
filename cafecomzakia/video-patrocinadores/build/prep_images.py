"""Prepara as imagens do vídeo (versão 2: só material real).

Fontes:
  - quadros reais das gravações: imagens automáticas do YouTube (maxres1/2/3.jpg) dos
    vídeos oficiais do canal @cafecomzakia, em research/youtube/frames/
  - logo dourado: imagem enviada pelo cliente, em research/cliente/

Uso (na raiz do projeto): python3 -I build/prep_images.py
"""
from PIL import Image, ImageFilter, ImageEnhance
import numpy as np
import os

F = "research/youtube/frames"
O = "assets/img"
os.makedirs(O, exist_ok=True)


def frame(name):
    return Image.open(f"{F}/{name}.jpg").convert("RGB")


def save(im, name, q=92):
    im.save(f"{O}/{name}.jpg", quality=q)


def sharpen(im):
    return im.filter(ImageFilter.UnsharpMask(radius=1.4, percent=55, threshold=2))


def crop45(name, cx, out_w=1000):
    """Recorte 4:5 de altura total (720) centrado em cx, ampliado para out_w de largura."""
    im = frame(name)
    w = 576
    x0 = int(min(max(cx - w / 2, 0), im.width - w))
    c = im.crop((x0, 0, x0 + w, 720))
    return sharpen(c.resize((out_w, round(out_w * 1.25)), Image.LANCZOS))


# Cena 1: plano aberto da estreia da 14ª temporada (mesa dourada e telão)
save(sharpen(frame("-nZZ1ynqW2o-maxres3").resize((1920, 1080), Image.LANCZOS)), "real-s1-mesa")

# Cena 2: Daniel Zákia no estúdio (placa dourada e caneca)
save(sharpen(frame("kOaDJWxeW0w-maxres1").crop((96, 40, 1216, 670)).resize((1280, 720), Image.LANCZOS)), "real-s2-daniel")

# Cena 3: convidados reais, recortes 4:5
GUESTS = [
    ("GHRLO0zxVMg-maxres2", 720),
    ("KA6jJ9wIu4c-maxres1", 650),
    ("gxucf5CIrl8-maxres2", 704),
    ("NtkLXKjvThw-maxres1", 600),
    ("_OMB2fwzfPk-maxres1", 300),
    ("RP2fvD_IeWE-maxres1", 300),
]
for i, (name, cx) in enumerate(GUESTS, 1):
    save(crop45(name, cx), f"real-s3-convidado{i}")

# Cena 5: plano aberto com o telão do estúdio (frame original, sem ampliação)
save(frame("GHRLO0zxVMg-maxres1"), "real-s5-telao", q=95)

# Atmosfera: estúdio real desfocado e escurecido (vertical)
bg = frame("GHRLO0zxVMg-maxres1").crop((300, 0, 705, 720)).resize((540, 960), Image.LANCZOS)
bg = ImageEnhance.Brightness(bg.filter(ImageFilter.GaussianBlur(16))).enhance(0.6)
save(bg.resize((1080, 1920), Image.LANCZOS), "real-bg-estudio", q=88)

# Logo dourado (imagem enviada pelo cliente): recorte e máscara que isola as letras do mármore
lg = Image.open("research/cliente/logo-dourado-enviado-pelo-cliente.jpg").convert("RGB").crop((86, 136, 556, 418))
lg = lg.resize((lg.width * 2, lg.height * 2), Image.LANCZOS)
a = np.asarray(lg).astype(float)
lum = 0.3 * a[..., 0] + 0.59 * a[..., 1] + 0.11 * a[..., 2]
alpha = np.clip((lum - 48) / 40, 0, 1)
rgba = np.dstack([a, alpha * 255]).astype("uint8")
logo = Image.fromarray(rgba, "RGBA")
logo = logo.crop(logo.getbbox())
logo.save(f"{O}/logo-dourado.png")
print("ok", logo.size)
