from pathlib import Path
import re
import shutil

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "_site"
EXCLUDED = {".git", ".github", "functions", "api", "py", "scripts", "node_modules", "_site"}
EXCLUDED_FILES = {"package.json", "package-lock.json", "server.js", "wrangler.jsonc", "vercel.json", ".gitmodules", ".gitignore"}

if OUT.exists():
    shutil.rmtree(OUT)
OUT.mkdir(parents=True)

for item in ROOT.iterdir():
    if item.name in EXCLUDED or item.name in EXCLUDED_FILES:
        continue
    target = OUT / item.name
    if item.is_dir():
        shutil.copytree(item, target, dirs_exist_ok=True)
    elif item.is_file():
        shutil.copy2(item, target)

# GitHub project pages serve this repository below /spydr/.
# Rewrite root-relative app paths only in the generated artifact.
path_pattern = re.compile(r'(?P<q>["\'(=])/(?P<path>(?:assets|css|js|apps|login\\.html|settings\\.html|study\\.html|lessons\\.html|search\\.html|review\\.html|flashcards\\.html)(?:/|["\'?#]))')
for path in OUT.rglob("*"):
    if not path.is_file() or path.suffix.lower() not in {".html", ".js", ".css", ".json"}:
        continue
    try:
        text = path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        continue
    if path.suffix.lower() == ".html" and "<head" in text.lower() and "name=\"spydr-pages-base\"" not in text:
        base_script = '<base href="/spydr/" data-spydr-pages-base="true">'
        text = re.sub(r'(<head(?:\\s[^>]*)?>)', r'\\1\\n' + base_script, text, count=1, flags=re.I)
    text = path_pattern.sub(lambda m: m.group("q") + "spydr/" + m.group("path"), text)
    path.write_text(text, encoding="utf-8")

(OUT / ".nojekyll").touch()
