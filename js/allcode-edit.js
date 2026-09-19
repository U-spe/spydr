// /js/allcode-edit.js

// 1. Dynamic Multi-Language State Engine
let files = [
    {
        id: 'file-html',
        name: 'index.html',
        lang: 'html',
        icon: 'ri-html5-fill',
        isDefault: true,
        code: `<div class="spydr-card"><div class="header-vibe"><i class="ri-gamepad-line"></i><h2>spydr</h2></div><p class="chill-text">proxy runnin' smooth. we good to go.</p><button class="vibe-btn" onclick="checkVibe()"><i class="ri-flashlight-line"></i> vibe check</button><div id="status-out"></div></div>`
    },
    {
        id: 'file-css',
        name: 'style.css',
        lang: 'css',
        icon: 'ri-css3-fill',
        isDefault: true,
        code: `@import url('https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');

body {
  background: #0f172a;
  color: #e2e8f0;
  font-family: 'JetBrains Mono', monospace;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.spydr-card {
  background: #1E293B;
  border: 1px solid rgba(100, 255, 218, 0.15);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  width: 100%;
  max-width: 340px;
}

.header-vibe {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #64FFDA;
  font-size: 1.5rem;
  font-weight: bold;
}

.header-vibe h2 {
  margin: 0;
  letter-spacing: -0.5px;
}

.chill-text {
  color: #94a3b8;
  font-size: 0.9rem;
  margin: 1.5rem 0 2rem 0;
}

.vibe-btn {
  background: transparent;
  color: #64FFDA;
  border: 2px solid #64FFDA;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-family: inherit;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 0 auto;
  width: 100%;
}

.vibe-btn:hover {
  background: rgba(100, 255, 218, 0.1);
  transform: translateY(-2px);
}

#status-out {
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: #64FFDA;
  min-height: 20px;
  opacity: 0.8;
}`
    },
    {
        id: 'file-js',
        name: 'script.js',
        lang: 'js',
        icon: 'ri-javascript-fill',
        isDefault: true,
        code: `function checkVibe() {
  const out = document.getElementById('status-out');
  const btn = document.querySelector('.vibe-btn');
  const originalHtml = btn.innerHTML;
  
  // swap to loading state
  btn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> hold up...';
  out.innerText = '';
  
  setTimeout(() => {
    // success state
    btn.innerHTML = '<i class="ri-check-line"></i> all good';
    btn.style.background = 'rgba(100, 255, 218, 0.1)';
    out.innerText = 'spydr is locked in. no cap.';
    
    console.log('vibe check passed. now can I lick dat puss-puss?');
    
    // reset after a few seconds
    setTimeout(() => {
      btn.innerHTML = originalHtml;
      btn.style.background = 'transparent';
      out.innerText = '';
    }, 3000);
  }, 1200);
}

console.log('spydr engine loaded n chillin.');`
    }
];

let activeFileId = 'file-html';

// 2. Icon Resolver for Custom Extensions
function getIconForLang(lang) {
    const icons = {
        html: 'ri-html5-fill',
        css: 'ri-css3-fill',
        js: 'ri-javascript-fill',
        ts: 'ri-code-s-slash-line',
        rs: 'ri-cpu-line',
        sh: 'ri-terminal-box-line',
        ajax: 'ri-global-line',
        json: 'ri-file-code-line',
        python: 'ri-code-line',
        py: 'ri-code-line'
    };
    return icons[lang.toLowerCase()] || 'ri-file-text-line';
}

// 3. DOM Elements
const editorArea = document.getElementById('code-editor');
const tabGroup = document.getElementById('tab-group');
const addTabBtn = document.getElementById('add-tab-btn');
const runBtn = document.getElementById('run-btn');
const autoRunToggle = document.getElementById('auto-run-toggle');
const liveFrame = document.getElementById('live-frame');

// 4. Tab UI Renderer
function renderTabs() {
    tabGroup.innerHTML = '';
    
    files.forEach(file => {
        const tab = document.createElement('button');
        tab.className = `file-tab ${file.id === activeFileId ? 'active' : ''}`;
        tab.setAttribute('data-id', file.id);
        tab.setAttribute('data-lang', file.lang);

        tab.innerHTML = `<i class="${file.icon}"></i> ${file.name}`;

        if (!file.isDefault) {
            const closeBtn = document.createElement('i');
            closeBtn.className = 'ri-close-line tab-close';
            closeBtn.onclick = (e) => {
                e.stopPropagation();
                deleteTab(file.id);
            };
            tab.appendChild(closeBtn);
        }

        tab.onclick = () => switchTab(file.id);
        tabGroup.appendChild(tab);
    });

    const activeFile = files.find(f => f.id === activeFileId);
    if (activeFile) {
        editorArea.value = activeFile.code;
        editorArea.placeholder = `// Editing ${activeFile.name} (${activeFile.lang.toUpperCase()})`;
    }
}

// 5. Tab Switching & Management
function switchTab(id) {
    activeFileId = id;
    renderTabs();
}

function addCustomTab() {
    const fileName = prompt("Enter file name (e.g., config.ajax, script.ts, main.rs, setup.sh):");
    if (!fileName || !fileName.trim()) return;

    const parts = fileName.trim().split('.');
    const ext = parts.length > 1 ? parts.pop().toLowerCase() : 'txt';
    const id = `file-${Date.now()}`;

    files.push({
        id: id,
        name: fileName.trim(),
        lang: ext,
        icon: getIconForLang(ext),
        isDefault: false,
        code: `// Custom file: ${fileName.trim()}\n// Write your ${ext.toUpperCase()} logic here.`
    });

    switchTab(id);
}

function deleteTab(id) {
    files = files.filter(f => f.id !== id);
    if (activeFileId === id) {
        activeFileId = files[0].id;
    }
    renderTabs();
    compileAndRun();
}

// 6. Core Compilation & Preview Execution Engine
function compileAndRun() {
    const htmlCode = files.filter(f => f.lang === 'html').map(f => f.code).join('\n');
    const cssCode = files.filter(f => f.lang === 'css').map(f => f.code).join('\n');
    const jsCode = files.filter(f => f.lang === 'js' || f.lang === 'ts' || f.lang === 'ajax').map(f => f.code).join('\n');

    const sourceCode = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <style>
                ${cssCode}
            </style>
        </head>
        <body>
            ${htmlCode}
            <script>
                try {
                    ${jsCode}
                } catch(err) {
                    console.error("Execution Error: " + err);
                }
            <\/script>
        </body>
        </html>
    `;

    const targetDocument = liveFrame.contentDocument || liveFrame.contentWindow.document;
    targetDocument.open();
    targetDocument.write(sourceCode);
    targetDocument.close();
}

// 7. Event Handlers
addTabBtn.addEventListener('click', addCustomTab);

let typeTimeout;
editorArea.addEventListener('input', (e) => {
    const activeFile = files.find(f => f.id === activeFileId);
    if (activeFile) {
        activeFile.code = e.target.value;
    }

    if (autoRunToggle.checked) {
        clearTimeout(typeTimeout);
        typeTimeout = setTimeout(() => {
            compileAndRun();
        }, 600);
    }
});

runBtn.addEventListener('click', compileAndRun);

// 8. Init App
renderTabs();
compileAndRun();
