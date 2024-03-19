const allButtons = document.querySelector(".buttons");
const display = document.querySelector("#display");
let firstNumber = "";
let secondNumber = "";
let operator = "";
let answer;

allButtons.addEventListener("click", (e) => {
    if (e.target.className == "digit") {
        if (operator == "") {
            firstNumber += e.target.textContent;
            display.textContent = firstNumber;
        } else {
            secondNumber += e.target.textContent;
            display.textContent = secondNumber;
        }
    }

    if (e.target.className == "operational") {
        if (e.target.id == "equals") {
            if (firstNumber && secondNumber) {
                answer = operate(firstNumber, secondNumber, operator);
                display.textContent = answer;
                firstNumber = answer;
                secondNumber = "";
                operator = "";
            } 
        } else if (operator != "") {
            answer = operate(firstNumber,secondNumber,operator);
            display.textContent = answer;
            firstNumber = answer;
            secondNumber = "";
            operator = e.target.textContent;
        } else {
            operator = e.target.textContent;
        }
    }

    if (e.target.className == "master") {
        if (e.target.id == "clear") {
            firstNumber = "";
            secondNumber = "";
            answer = "";
            operator = "";
            display.textContent = "0";
        }
        if (e.target.id == "negate") {
            if (operator == "") {
                firstNumber = String(Number(firstNumber) * -1);
                display.textContent = firstNumber;
            } else {
                secondNumber = String(Number(secondNumber) * -1);
                display.textContent = secondNumber;
            }
        }
    }
});

function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return Number(a) - Number(b);
}

function multiply(a, b) {
    return Number(a) * Number(b);
}

function divide(a, b) {
    if (b == 0) {
        return "big and spooky";
    }
    return Number(a) / Number(b);
}

function operate(a, b, operator) {
    switch(operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}