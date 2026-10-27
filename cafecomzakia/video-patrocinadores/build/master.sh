#!/usr/bin/env bash
# Masteriza a trilha para -14 LUFS integrados, pico verdadeiro <= -1.5 dBTP, 48 kHz.
# Uso (na raiz do projeto): bash build/master.sh
set -euo pipefail
IN=assets/audio/trilha-premix.wav
OUT=assets/audio/trilha-original-master.wav
# 1ª passada: mede
STATS=$(ffmpeg -hide_banner -nostats -i "$IN" -af loudnorm=I=-14:TP=-1.5:LRA=9:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
mi=$(echo "$STATS" | python3 -c 'import json,sys;print(json.load(sys.stdin)["input_i"])')
mtp=$(echo "$STATS" | python3 -c 'import json,sys;print(json.load(sys.stdin)["input_tp"])')
mlra=$(echo "$STATS" | python3 -c 'import json,sys;print(json.load(sys.stdin)["input_lra"])')
mth=$(echo "$STATS" | python3 -c 'import json,sys;print(json.load(sys.stdin)["input_thresh"])')
off=$(echo "$STATS" | python3 -c 'import json,sys;print(json.load(sys.stdin)["target_offset"])')
# 2ª passada: aplica (linear quando possível)
ffmpeg -hide_banner -nostats -y -i "$IN" -af "loudnorm=I=-14:TP=-1.5:LRA=9:measured_I=$mi:measured_TP=$mtp:measured_LRA=$mlra:measured_thresh=$mth:offset=$off:linear=true:print_format=summary,aresample=48000" -c:a pcm_s16le "$OUT" 2>&1 | tail -14
echo "--- verificação (ebur128)"
ffmpeg -hide_banner -nostats -i "$OUT" -af ebur128=peak=true -f null - 2>&1 | sed -n '/Summary/,$p'
echo "--- stems em FLAC (sem perda) e limpeza do premix"
for s in musica sfx; do
  ffmpeg -hide_banner -loglevel error -y -i "assets/audio/trilha-$s.wav" -c:a flac "assets/audio/trilha-$s.flac" && rm "assets/audio/trilha-$s.wav"
done
rm -f "$IN"
