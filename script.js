const calculator = {
    displayValue: '0', //valeur affichée 
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null, //stocke l'opérateur
};

function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
};
updateDisplay();

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;
    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    // if 0 alors on remplace la valeur, sinon on ajoute le chiffre
    }
};

function inputDecimal(dot) {
    //if displayValue n'a pas de "."
    if(!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
};

function handleOperator(nextOpe) {
    //destructurer l'objet calculator
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue); 
    //convertir displayValue string en nombre flottant
    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    } else if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        calculator.displayValue = result; // ?????????????????? String(result)
        calculator.firstOperand = result;
    }
    calculator.waitingForSecondOperand = true;
    //indique que le premier opérateur a été entré
    calculator.operator = nextOpe;
};

function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
      return firstOperand + secondOperand;
    } else if (operator === '-') {
      return firstOperand - secondOperand;
    } else if (operator === '*') {
      return firstOperand * secondOperand;
    } else if (operator === '/') {
      return firstOperand / secondOperand;
    }
    return secondOperand;
};

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
}

const buttons = document.querySelector('.calculator-buttons');
buttons.addEventListener('click', (event) => {
    const { target } = event; //const target = event.target;
    //représente l'élément cliqué
    if (!target.matches('button')) {
        return;
    } else if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
    } else if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
    } else if (target.classList.contains('clear')) {
        resetCalculator();
        updateDisplay();
    } else {
        inputDigit(target.value);
        updateDisplay();
    }
});


