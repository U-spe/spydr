/* ==========================================================
   SPYDR Calculator
   /js/calc.js
========================================================== */

const expression = document.getElementById("expression");
const result = document.getElementById("result");

const buttons = document.querySelectorAll(".buttons button");

const historyBtn = document.getElementById("historyBtn");
const historyPanel = document.getElementById("historyPanel");
const historyList = document.getElementById("historyList");
const clearHistory = document.getElementById("clearHistory");

let current = "";

let history = JSON.parse(localStorage.getItem("spydr_calc_history") || "[]");

/* ==========================================================
   INIT
========================================================== */

renderHistory();
updateDisplay();

/* ==========================================================
   BUTTONS
========================================================== */

buttons.forEach(btn => {

    btn.addEventListener("click", () => {

        const value = btn.textContent.trim();

        if(btn.dataset.action === "clear"){
            clearAll();
            return;
        }

        if(btn.dataset.action === "delete"){
            backspace();
            return;
        }

        if(value === "="){
            solve();
            return;
        }

        append(value);

    });

});

/* ==========================================================
   INPUT
========================================================== */

function append(value){

    if(value === "×") value = "*";
    if(value === "÷") value = "/";
    if(value === "−") value = "-";

    current += value;

    updateDisplay();

}

function clearAll(){

    current = "";

    updateDisplay();

}

function backspace(){

    current = current.slice(0,-1);

    updateDisplay();

}

/* ==========================================================
   DISPLAY
========================================================== */

function updateDisplay(){

    expression.textContent = prettify(current);

    if(current === ""){

        result.textContent = "0";
        return;

    }

    try{

        const answer = evaluate(current);

        result.textContent = format(answer);

    }

    catch{

        result.textContent = "...";

    }

}

/* ==========================================================
   SOLVE
========================================================== */

function solve(){

    if(current === "") return;

    try{

        const answer = evaluate(current);

        history.unshift({

            expression: prettify(current),

            result: format(answer)

        });

        history = history.slice(0,50);

        localStorage.setItem(
            "spydr_calc_history",
            JSON.stringify(history)
        );

        renderHistory();

        current = String(answer);

        updateDisplay();

    }

    catch{

        result.textContent = "Error";

    }

}

/* ==========================================================
   EVALUATION
========================================================== */

function evaluate(expr){

    expr = expr.replace(/%/g,"/100");

    return Function(
        `"use strict"; return (${expr})`
    )();

}

/* ==========================================================
   HISTORY
========================================================== */

function renderHistory(){

    if(history.length === 0){

        historyList.innerHTML = `
            <p class="empty">
                No calculations yet.
            </p>
        `;

        return;

    }

    historyList.innerHTML = "";

    history.forEach(item=>{

        const div = document.createElement("div");

        div.className = "history-item";

        div.innerHTML = `

            <div class="history-expression">

                ${item.expression}

            </div>

            <div class="history-result">

                ${item.result}

            </div>

        `;

        div.onclick = ()=>{

            current = String(item.result);

            updateDisplay();

            historyPanel.classList.remove("open");

        };

        historyList.appendChild(div);

    });

}

/* ==========================================================
   HISTORY PANEL
========================================================== */

historyBtn.onclick = ()=>{

    historyPanel.classList.toggle("open");

};

clearHistory.onclick = ()=>{

    history = [];

    localStorage.removeItem("spydr_calc_history");

    renderHistory();

};

/* ==========================================================
   KEYBOARD
========================================================== */

document.addEventListener("keydown",e=>{

    if(e.key >= "0" && e.key <= "9"){

        append(e.key);
        return;

    }

    if(e.key === "."){

        append(".");
        return;

    }

    if(["+","-","*","/","%","(",")"].includes(e.key)){

        append(e.key);
        return;

    }

    if(e.key === "Enter"){

        e.preventDefault();

        solve();

        return;

    }

    if(e.key === "Backspace"){

        backspace();

        return;

    }

    if(e.key === "Delete"){

        clearAll();

        return;

    }

    if(e.key === "Escape"){

        historyPanel.classList.remove("open");

    }

});

/* ==========================================================
   HELPERS
========================================================== */

function prettify(str){

    return str
        .replace(/\*/g,"×")
        .replace(/\//g,"÷")
        .replace(/-/g,"−");

}

function format(num){

    if(!isFinite(num))
        return "Error";

    return Number(num).toLocaleString(undefined,{
        maximumFractionDigits:10
    });

}
