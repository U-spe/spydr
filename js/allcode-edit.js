// /js/allcode-edit.js

// 1. Setup Data State
const workspaceData = {
    html: `<div class="spydr-demo">\n  <h1>sys_hello</h1>\n  <p>spydr execution environment active.</p>\n  <button onclick="pingSystem()">Ping System</button>\n</div>`,
    css: `body {\n  background: #090909;\n  color: #fff;\n  font-family: 'Space Grotesk', sans-serif;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n  margin: 0;\n}\n\n.spydr-demo {\n  text-align: center;\n  padding: 2rem;\n  border: 1px solid rgba(124, 58, 237, 0.4);\n  border-radius: 12px;\n  background: rgba(25, 25, 30, 0.8);\n  box-shadow: 0 0 20px rgba(63, 94, 251, 0.2);\n}\n\nh1 {\n  color: #7c3aed;\n  margin-bottom: 0.5rem;\n}\n\nbutton {\n  margin-top: 1rem;\n  padding: 0.5rem 1rem;\n  background: #3f5efb;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n}`,
    js: `function pingSystem() {\n  alert('spydr engine responding. Connection secure.');\n}\n\nconsole.log('Compile successful.');`
};

let activeFile = 'html';

// 2. DOM Elements
const editorArea = document.getElementById('code-editor');
const fileTabs = document.querySelectorAll('.file-tab');
const runBtn = document.getElementById('run-btn');
const autoRunToggle = document.getElementById('auto-run-toggle');
const liveFrame = document.getElementById('live-frame');

// 3. Core Compilation Engine
function compileAndRun() {
    // Generate the full document structure
    const sourceCode = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <style>
                ${workspaceData.css}
            </style>
        </head>
        <body>
            ${workspaceData.html}
            <script>
                try {
                    ${workspaceData.js}
                } catch(err) {
                    console.error("Execution Error: " + err);
                }
            <\/script>
        </body>
        </html>
    `;

    // Inject into the iframe
    const targetDocument = liveFrame.contentDocument || liveFrame.contentWindow.document;
    targetDocument.open();
    targetDocument.write(sourceCode);
    targetDocument.close();
}

// 4. Tab Management
fileTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Update UI
        fileTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Update State & Editor
        activeFile = tab.getAttribute('data-lang');
        editorArea.value = workspaceData[activeFile];

        // Aesthetic hint updating
        if(activeFile === 'html') editorArea.placeholder = '';
        if(activeFile === 'css') editorArea.placeholder = '/* Apply CSS styling here */';
        if(activeFile === 'js') editorArea.placeholder = '// Write Javascript logic here';
    });
});

// 5. Input Handler with Debounce (for Auto-run)
let typeTimeout;
editorArea.addEventListener('input', (e) => {
    // Save current keystrokes to the specific file's state
    workspaceData[activeFile] = e.target.value;

    if (autoRunToggle.checked) {
        clearTimeout(typeTimeout);
        typeTimeout = setTimeout(() => {
            compileAndRun();
        }, 600); // 600ms delay after user stops typing
    }
});

// Manual Run Fallback
runBtn.addEventListener('click', compileAndRun);

// 6. Initialize App
editorArea.value = workspaceData[activeFile];
compileAndRun();
