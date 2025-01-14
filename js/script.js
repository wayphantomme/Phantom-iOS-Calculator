// DOM Elements
const display = document.getElementById('display');
const history = document.getElementById('history');

// State
let currentInput = '0';
let calculations = [];

// Display Functions
function updateDisplay() {
    display.textContent = currentInput;
}

function updateHistory() {
    history.innerHTML = calculations
        .map(calc => `<div class="history-item">
            <span>${calc.expression}</span>
            <span>${calc.result}</span>
        </div>`)
        .join('');
    history.scrollTop = history.scrollHeight;
}

// Input Functions
function appendNumber(num) {
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else {
        currentInput += num;
    }
    updateDisplay();
}

function appendOperator(operator) {
    currentInput += operator;
    updateDisplay();
}

// Clear Functions
function clearDisplay() {
    currentInput = '0';
    updateDisplay();
}

function clearHistory() {
    calculations = [];
    updateHistory();
}

// Calculate Function
function calculate() {
    try {
        let expression = currentInput
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/−/g, '-');
        let result = eval(expression);
        
        if (Number.isInteger(result)) {
            result = result.toString();
        } else {
            result = result.toFixed(8).replace(/\.?0+$/, '');
        }

        // Add to history
        calculations.push({
            expression: currentInput,
            result: result
        });

        // Keep only last 10 calculations
        if (calculations.length > 10) {
            calculations.shift();
        }

        currentInput = result;
        updateDisplay();
        updateHistory();
    } catch (error) {
        currentInput = 'Error';
        updateDisplay();
        setTimeout(clearDisplay, 1000);
    }
}
