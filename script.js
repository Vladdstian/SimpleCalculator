var firstNumber = '';
var secondNumber = '';
var currentEquationSign = '';

var screenText = document.querySelector('.screen-text');
var buttons = document.querySelectorAll('.button');

function isEquationSign(text) {
    return ['+', '-', 'x', '/'].includes(text);
}

buttons.forEach(function(button) {
    button.addEventListener('click', function(event) {
        
        var buttonText = button.querySelector('.button-text').textContent;
        if (buttonText === '.' && screenText.textContent.includes('.')) {
            return;
        }

        if (button.id === 'equation') {
            if (isEquationSign(screenText.textContent)) {
                screenText.textContent = buttonText;
            } else {
                currentNumber = screenText.textContent;
                currentEquationSign = buttonText;
                screenText.textContent = buttonText;
            }
        } else {
            if (isEquationSign(screenText.textContent)) {
                screenText.textContent = buttonText;
            } else {
                if (screenText.textContent === '0' && buttonText !== '.') {
                    screenText.textContent = buttonText;
                } else {
                    screenText.textContent += buttonText;
                }
            }
        }
    });
});



