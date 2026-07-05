let display = document.getElementById('display');
let expression = '';

function appendNumber(num) {
    // Prevent multiple decimal points in a number
    if (num === '.') {
        const lastOperator = Math.max(
            expression.lastIndexOf('+'),
            expression.lastIndexOf('-'),
            expression.lastIndexOf('*'),
            expression.lastIndexOf('/'),
            expression.lastIndexOf('%')
        );
        const lastPart = expression.substring(lastOperator + 1);
        if (lastPart.includes('.')) return;
    }
    expression += num;
    updateDisplay();
}

function appendOperator(op) {
    // Prevent operator at the beginning (except minus for negative numbers)
    if (expression === '' && op !== '-') return;
    
    // Prevent consecutive operators
    const lastChar = expression[expression.length - 1];
    if ('+-*/%'.includes(lastChar)) {
        expression = expression.slice(0, -1) + op;
    } else {
        expression += op;
    }
    updateDisplay();
}

function clearDisplay() {
    expression = '';
    updateDisplay();
}

function deleteLast() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    display.value = expression || '0';
}

function calculate() {
    try {
        // Replace % with /100 for proper calculation
        let calcExpression = expression.replace(/%/g, '/100');
        let result = eval(calcExpression);
        
        // Round to 10 decimal places to avoid floating point errors
        result = Math.round(result * 10000000000) / 10000000000;
        
        expression = result.toString();
        updateDisplay();
    } catch (error) {
        display.value = 'Error';
        expression = '';
    }
}

// Allow keyboard input
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '.') {
        appendNumber('.');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});

// Initialize display
updateDisplay();
