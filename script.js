// Variables to hold the numbers and the operation
var firstNumber = '';
var secondNumber = '';
var currentEquationSign = '';
var isSecondNumber = false;

// Getting references to the screen and buttons
var screenText = document.querySelector('.screen-text');
var buttons = document.querySelectorAll('.button');
var resetButton = document.querySelector('#reset');
var equalsButton = document.querySelector('#equals');
var delButton = document.querySelector('.special-button');

buttons.forEach(function(button) {
    button.addEventListener('click', function(event) {
        var buttonText = button.querySelector('.button-text').textContent;
        
        // Handling decimal point
        if (buttonText === '.' && screenText.textContent.includes('.')) {
            return;
        } else if (buttonText === '.') {
            screenText.textContent += buttonText;
            if (isSecondNumber) {
                secondNumber += buttonText;
            } else {
                firstNumber += buttonText;
            }
            return; 
        }
        
        // Handling number input
        if (!isNaN(buttonText)) {
            if (screenText.textContent === '0' || isEquationSign(screenText.textContent)) {
                screenText.textContent = buttonText;
            } else {
                screenText.textContent += buttonText;
            }
            if (isSecondNumber) {
                secondNumber += buttonText;
            } else {
                firstNumber += buttonText;
            }
        }
        
        // Handling equation sign
        if (isEquationSign(buttonText)) {
            if (isSecondNumber) {
                // Calculating intermediate result if a second equation sign is pressed
                firstNumber = calculate();
                secondNumber = '';
            } else {
                firstNumber = screenText.textContent;
            }
            currentEquationSign = buttonText;
            isSecondNumber = true;
            screenText.textContent = buttonText;
        }
    });
});

resetButton.addEventListener('click', reset);
equalsButton.addEventListener('click', evaluate);
delButton.addEventListener('click', deleteLastCharacter);

function isEquationSign(text) {
    return ['+', '-', 'x', '/'].includes(text);
}

function calculate() {
    var result;
    var num1 = parseFloat(firstNumber);
    var num2 = parseFloat(secondNumber);
    
    switch (currentEquationSign) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case 'x':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            break;
        default:
            return;
    }
    
    return result.toString();
}

function reset() {
    firstNumber = '';
    secondNumber = '';
    currentEquationSign = '';
    isSecondNumber = false;
    screenText.textContent = '0';
}

function evaluate() {
    if (currentEquationSign && (firstNumber || firstNumber === '0') && (secondNumber || secondNumber === '0')) {
        screenText.textContent = calculate();
        firstNumber = screenText.textContent;
        secondNumber = '';
        currentEquationSign = '';
        isSecondNumber = false;
    }
}

function deleteLastCharacter() {
    if (screenText.textContent !== '0' && !isEquationSign(screenText.textContent)) {
        screenText.textContent = screenText.textContent.slice(0, -1) || '0';
        if (isSecondNumber) {
            secondNumber = screenText.textContent;
        } else {
            firstNumber = screenText.textContent;
        }
    } else if (isEquationSign(screenText.textContent)) {
        screenText.textContent = isSecondNumber ? secondNumber : firstNumber;
        currentEquationSign = '';
    }
}
