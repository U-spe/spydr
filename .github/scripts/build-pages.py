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
# Prefix root-relative app URLs in the generated copy, not the source files.
path_pattern = re.compile(r'(?P<q>["\'(=])/(?P<path>(?:assets|css|js|apps|(?:login|settings|study|lessons|search|review|flashcards)\.html)(?:/|["\'?#]))')
for path in OUT.rglob("*"):
    if not path.is_file() or path.suffix.lower() not in {".html", ".js", ".css", ".json"}:
        continue
    try:
        content = path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        continue
    if path.suffix.lower() == ".html" and "<head" in content.lower() and "data-spydr-pages-base" not in content:
        base_tag = '<base href="/spydr/" data-spydr-pages-base="true">'
        content = re.sub(r'(<head(?:\s[^>]*)?>)', r'\1\n' + base_tag, content, count=1, flags=re.I)
    content = path_pattern.sub(lambda match: match.group("q") + "/spydr/" + match.group("path"), content)
    path.write_text(content, encoding="utf-8")

(OUT / ".nojekyll").touch()
