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
    const { displayValue } = calculator;
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    // if 0 alors on remplace la valeur, sinon on ajoute le chiffre
};

function inputDecimal(dot) {
    //if displayValue n'a pas de "."
    if(!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

const buttons = document.querySelector('.calculator-buttons');
buttons.addEventListener('click', (event) => {
    const { target } = event; //const target = event.target;
    //représente l'élément cliqué
    if (!target.matches('button')) {
        return;
    } else if (target.classList.contains('operator')) {
        console.log('operator', target.value);
        return;
    } else if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
    } else if (target.classList.contains('clear')) {
        console.log('clear', target.value);
        return;
    } else {
        inputDigit(target.value);
        updateDisplay();
    }
});



