# Fonte deste arquivo antes dos comandos do HyperFrames neste ambiente:  source build/env.sh
export HYPERFRAMES_NO_TELEMETRY=1
export HYPERFRAMES_SKIP_SKILLS=1
HS=$(ls -d /opt/pw-browsers/chromium_headless_shell-*/chrome-headless-shell-linux64 2>/dev/null | head -1)
if [ -n "$HS" ]; then
  export PRODUCER_HEADLESS_SHELL_PATH="$HS/chrome-headless-shell"
  export HYPERFRAMES_BROWSER_PATH="$PRODUCER_HEADLESS_SHELL_PATH"
fi
