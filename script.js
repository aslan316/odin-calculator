const allButtons = document.querySelector(".buttons");
const display = document.querySelector("#display");
let firstNumber = "";
let secondNumber = "";
let operator = "";
let answer;

allButtons.addEventListener("click", (e) => {
    if (e.target.className == "digit") {
        digitButton(e.target);
    }

    if (e.target.className == "operational") {
        operationalButton(e.target);
    }

    if (e.target.className == "master") {
        masterButtons(e.target);
    }
});

function digitButton(target) {
    if (operator == "") {
        firstNumber += target.textContent;
        display.textContent = firstNumber;
    } else {
        secondNumber += target.textContent;
        display.textContent = secondNumber;
    }
}

function operationalButton(target) {
    if (target.id == "equals") {
        if (firstNumber && secondNumber) {
            answer = operate(firstNumber, secondNumber, operator);
            display.textContent = answer;
            firstNumber = "";
            secondNumber = "";
            operator = "";
        } 
    } else if (operator != "") {
        answer = operate(firstNumber,secondNumber,operator);
        display.textContent = answer;
        firstNumber = answer;
        secondNumber = "";
        operator = target.textContent;
    } else {
        operator = target.textContent;
    }
}

function masterButtons(target) {
    if (target.id == "clear") {
        clear();
     }

    if (target.id == "negate") {
        negateNumber();
    }

    if (target.id == "delete") {
        deleteEndOfNumber();
    }
}

function clear() {
    firstNumber = "";
    secondNumber = "";
    answer = "";
    operator = "";
    display.textContent = "0";
}

function negateNumber() {
    if (operator == "") {
        firstNumber = String(Number(firstNumber) * -1);
        display.textContent = firstNumber;
    } else {
        secondNumber = String(Number(secondNumber) * -1);
        display.textContent = secondNumber;
    }
}

function deleteEndOfNumber() {
    if (operator == "") {
        firstNumber = firstNumber.slice(0, firstNumber.length - 1);
        if (firstNumber != "") {
            display.textContent = firstNumber;
        } else {
            display.textContent = "0";
        }
    } else {
        secondNumber = secondNumber.slice(0, secondNumber.length - 1);
        if (secondNumber != "") {
            display.textContent = secondNumber;
            } else {
            display.textContent = "0";
        }
    }
}

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