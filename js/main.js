
const valorNumero = document.getElementById('valor_numero');
const buttons = Array.from(document.querySelectorAll('input[type="Button"]'));

let currentInput = '';
let operator = '';
let firstOperand = null;

buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const value = event.target.value;

        if (value === 'Ac') {
            clearCalculator();
            return;
        }

        if (value === '=') {
            calculate();
            return;
        }

        if (['+', '-', 'x', '/'].includes(value)) {
            setOperator(value);
            return;
        }

        if (value === '+/-') {
            toggleSign();
            return;
        }

        appendToInput(value);
    });
});

function appendToInput(value) {
    if (value === '.' && currentInput.includes('.')) return;

    if (currentInput.length < 20) {
        currentInput += value;
        valorNumero.value = currentInput || '0';
    }
}

function setOperator(op) {
    if (currentInput === '') return;

    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
    } else {
        calculate();
    }
    
    operator = op === 'x' ? '*' : op;
    currentInput = '';
}

function calculate() {
    if (firstOperand === null || currentInput === '') return;

    let secondOperand = parseFloat(currentInput);
    let result;

    switch (operator) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            result = firstOperand / secondOperand;
            break;
        default:
            return;
    }

    valorNumero.value = result;
    resetCalculator(result);
}

function toggleSign() {
    if (currentInput) {
        currentInput = String(-parseFloat(currentInput));
    } else {
        currentInput = '0';
    }
    
    valorNumero.value = currentInput;
}

function clearCalculator() {
    currentInput = '';
    operator = '';
    firstOperand = null;
    valorNumero.value = '0';
}

function resetCalculator(result) {
    currentInput = String(result);
    operator = '';
    firstOperand = null;
}