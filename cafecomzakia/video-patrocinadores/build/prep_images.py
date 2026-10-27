"""Recortes e tratamento das imagens oficiais (thumbnails do YouTube @cafecomzakia e logo do site).
Uso: python3 -I build/prep_images.py  (a partir da raiz do projeto)"""
from PIL import Image, ImageFilter, ImageEnhance
import os
R='research'; O='assets/img'; os.makedirs(O,exist_ok=True)
def thumb(i): return Image.open(f'{R}/youtube/thumbs/{i}.jpg').convert('RGB')
def up(im,w):
    h=round(im.height*w/im.width); im=im.resize((w,h),Image.LANCZOS)
    return im.filter(ImageFilter.UnsharpMask(radius=1.6,percent=60,threshold=2))
crops={
 # nome: (videoId, box x0,y0,x1,y1, largura final)
 's2-estudio-daniel': ('kOaDJWxeW0w',(640,196,1280,578),1200),
 's3-negocios':       ('kOaDJWxeW0w',(0,262,600,578),1200),
 's3-lideranca':      ('GHRLO0zxVMg',(0,262,530,578),1200),
 's3-comunicacao':    ('0FGdJ3bqnqk',(0,262,600,578),1200),
 's5-mesa':           ('FbfFaww9XLc',(335,250,940,578),1200),
}
for n,(vid,box,w) in crops.items():
    up(thumb(vid).crop(box),w).save(f'{O}/{n}.jpg',quality=92)
# fundo atmosférico vertical (cena 1/4): centro do cenário, desfocado e escurecido
bg=thumb('kOaDJWxeW0w').crop((430,200,770,578)).resize((540,960),Image.LANCZOS).filter(ImageFilter.GaussianBlur(18))
bg=ImageEnhance.Brightness(bg).enhance(0.55)
bg.resize((1080,1920),Image.LANCZOS).save(f'{O}/bg-estudio-desfocado.jpg',quality=88)
# logo oficial (branco) do site, recortado ao conteúdo
lg=Image.open(f'{R}/site/img/logo-white.png').convert('RGBA'); lg=lg.crop(lg.getbbox()); lg.save(f'{O}/logo-cafe-com-zakia-branco.png')
print('ok', lg.size)
