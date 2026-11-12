from pathlib import Path
import re
import shutil
import os

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "_site"
EXCLUDED = {".git", ".github", "functions", "api", "py", "scripts", "node_modules", "_site"}
EXCLUDED_FILES = {"package.json", "package-lock.json", "server.js", "wrangler.jsonc", "vercel.json", ".gitmodules", ".gitignore"}
API_ORIGIN = (os.environ.get("SPYDR_API_ORIGIN") or "https://spydr-delta.vercel.app").rstrip("/")

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

path_pattern = re.compile(r'(?P<q>["\'(=])/(?P<path>(?:assets|css|js|apps|(?:login|settings|study|lessons|search|review|flashcards)\.html)(?:/|["\'?#]))')
for path in OUT.rglob("*"):
    if not path.is_file() or path.suffix.lower() not in {".html", ".js", ".css", ".json"}:
        continue
    try:
        content = path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        continue

    base_tag = None
    if path.suffix.lower() == ".html" and "<head" in content.lower() and "data-spydr-pages-base" not in content:
        relative_parts = path.relative_to(OUT).parts
        if len(relative_parts) > 2 and relative_parts[:2] == ("assets", "storage"):
            submodule_base = "/assets/storage/" + relative_parts[2] + "/"
            base_expression = 'location.hostname.endsWith(".github.io")?"/spydr' + submodule_base + '":"' + submodule_base + '"'
        else:
            base_expression = 'location.hostname.endsWith(".github.io")?"/spydr/":"/"'
        base_tag = '<script>const spydrBase=document.createElement("base");spydrBase.href=' + base_expression + ';document.head.prepend(spydrBase);</script>'

    tick = chr(96)
    content = content.replace('"/api/', '"' + API_ORIGIN + '/api/').replace("'/api/", "'" + API_ORIGIN + "/api/").replace(tick + "/api/", tick + API_ORIGIN + "/api/")
    content = path_pattern.sub(lambda match: match.group("q") + match.group("path"), content)
    content = content.replace('window.location.replace("/")', 'window.location.replace(new URL("./", document.baseURI).href)')

    if base_tag:
        content = re.sub(r'(<head(?:\s[^>]*)?>)', r'\1\n' + base_tag, content, count=1, flags=re.I)

    path.write_text(content, encoding="utf-8")

(OUT / ".nojekyll").touch()
