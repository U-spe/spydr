// /js/calculator.js

class SpydrCalculator {
    constructor() {
        // State
        this.currentInput = '';
        this.history = '';
        this.isRadian = false;
        this.lastAnswer = '0';
        this.isResultState = false; // Tracks if the screen is currently displaying a result

        // DOM Elements
        this.currentDisplay = document.getElementById('calc-current');
        this.historyDisplay = document.getElementById('calc-history');
        this.degInd = document.getElementById('deg-ind');
        this.radInd = document.getElementById('rad-ind');

        this.init();
    }

    init() {
        // Map all buttons
        document.querySelectorAll('.calc-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const value = btn.getAttribute('data-value');
                const action = btn.getAttribute('data-action');

                if (action) {
                    this.handleAction(action);
                } else if (value) {
                    this.handleInput(value);
                }
            });
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    handleInput(val) {
        // If a calculation was just completed and user types a number, start fresh
        if (this.isResultState) {
            if (/[0-9]|\./.test(val) || val.includes('(') || val === 'π' || val === 'e') {
                this.currentInput = '';
            }
            this.isResultState = false;
        }

        // Handle specific string insertions
        if (val === 'ANS') {
            this.currentInput += this.lastAnswer;
        } else {
            this.currentInput += val;
        }
        
        this.updateDisplay();
    }

    handleAction(action) {
        switch(action) {
            case 'clear':
                this.currentInput = '';
                this.history = '';
                this.isResultState = false;
                break;
            case 'delete':
                if (this.isResultState) {
                    this.history = '';
                    this.isResultState = false;
                } else {
                    this.currentInput = this.currentInput.slice(0, -1);
                }
                break;
            case 'deg-rad':
                this.isRadian = !this.isRadian;
                this.updateIndicators();
                // If there's a result on screen, don't clear it, just change mode
                break;
            case 'calculate':
                this.calculate();
                break;
        }
        this.updateDisplay();
    }

    updateIndicators() {
        if (this.isRadian) {
            this.radInd.classList.add('active');
            this.degInd.classList.remove('active');
        } else {
            this.degInd.classList.add('active');
            this.radInd.classList.remove('active');
        }
    }

    calculate() {
        if (!this.currentInput) return;

        this.history = this.currentInput;
        
        try {
            // 1. Sanitize & Translate visual math to JS math
            let mathExpr = this.currentInput
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/π/g, 'Math.PI')
                .replace(/e/g, 'Math.E')
                .replace(/sin\(/g, 'sin(')
                .replace(/cos\(/g, 'cos(')
                .replace(/tan\(/g, 'tan(')
                .replace(/log\(/g, 'log10(')
                .replace(/ln\(/g, 'ln(')
                .replace(/√\(/g, 'sqrt(')
                .replace(/\^/g, '**');

            // Handle Factorials via Regex (e.g., 5! -> fact(5))
            mathExpr = mathExpr.replace(/(\d+(?:\.\d+)?)!/g, 'fact($1)');

            // Auto-close missing parentheses at the end
            const openParens = (mathExpr.match(/\(/g) || []).length;
            const closeParens = (mathExpr.match(/\)/g) || []).length;
            for (let i = 0; i < openParens - closeParens; i++) {
                mathExpr += ')';
            }

            // 2. Build a safe execution context
            const isRad = this.isRadian;
            const context = `
                // Math helpers scoped locally
                const toRad = (x) => x * (Math.PI / 180);
                const sin = (x) => ${isRad} ? Math.sin(x) : Math.sin(toRad(x));
                const cos = (x) => ${isRad} ? Math.cos(x) : Math.cos(toRad(x));
                const tan = (x) => ${isRad} ? Math.tan(x) : Math.tan(toRad(x));
                const log10 = Math.log10;
                const ln = Math.log;
                const sqrt = Math.sqrt;
                
                // Factorial function
                const fact = (n) => {
                    let num = Math.round(n); // Only integers
                    if (num < 0) return NaN;
                    if (num <= 1) return 1;
                    let result = 1;
                    for (let i = 2; i <= num; i++) result *= i;
                    return result;
                };

                // Execute
                return ${mathExpr};
            `;

            // 3. Evaluate
            const result = new Function(context)();
            
            // 4. Format Output
            if (!isFinite(result) || isNaN(result)) {
                throw new Error("Math Error");
            }

            // Round to 10 decimal places to prevent floating point weirdness (e.g. 0.1 + 0.2)
            const finalResult = Math.round(result * 10000000000) / 10000000000;
            
            this.currentInput = finalResult.toString();
            this.lastAnswer = this.currentInput;
            this.isResultState = true;

        } catch (error) {
            this.currentInput = 'Error';
            this.isResultState = true;
        }
    }

    updateDisplay() {
        this.currentDisplay.innerText = this.currentInput || '0';
        this.historyDisplay.innerText = this.history ? this.history + ' =' : '';
    }

    handleKeyboard(e) {
        // Map standard keyboard inputs to calculator inputs
        const keyMap = {
            'Enter': 'calculate',
            '=': 'calculate',
            'Backspace': 'delete',
            'Escape': 'clear',
            '*': '×',
            '/': '÷',
            '+': '+',
            '-': '-'
        };

        if (keyMap[e.key]) {
            e.preventDefault();
            this.handleAction(keyMap[e.key] === 'calculate' || keyMap[e.key] === 'delete' || keyMap[e.key] === 'clear' ? keyMap[e.key] : null);
            if (['×', '÷', '+', '-'].includes(keyMap[e.key])) this.handleInput(keyMap[e.key]);
        } else if (/[0-9]|\.|[()]|\^|!/.test(e.key)) {
            e.preventDefault();
            this.handleInput(e.key);
        }
    }
}

// Boot up
document.addEventListener('DOMContentLoaded', () => {
    new SpydrCalculator();
});
