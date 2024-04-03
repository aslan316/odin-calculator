const allButtons = document.querySelector(".buttons");
const allMasterButtons = document.querySelectorAll(".master");
const allDigitButtons = document.querySelectorAll(".digit");
const allOperationalButtons = document.querySelectorAll(".operational");
const display = document.querySelector("#display");
let firstNumber = "";
let secondNumber = "";
let operator = "";
let decimalUsed = false;
let answer;

allButtons.addEventListener("mousedown", (e) => {
    if (e.target.className == "digit") {
        e.target.style.backgroundColor = "#c94271";
    }

    if (e.target.className == "master") {
        e.target.style.backgroundColor = "#d43131";
    }

    if (e.target.className == "operational") {
        e.target.style.backgroundColor = "#f70764";
    }
});

allButtons.addEventListener("mouseup", () => {
    allMasterButtons.forEach(setMasterButtonColor);
    allDigitButtons.forEach(setDigitButtonColor);
});

function setMasterButtonColor(button) {
    button.style.backgroundColor = "#f43838";
}

function setDigitButtonColor(button) {
    button.style.backgroundColor = "#f25189";
}

function setOperationalButtonColor(button) {
    button.style.backgroundColor = "#d10755";
}

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
    //a decimal can only be used once per number, or math gets messy
    if (!(target.id == "decimal" && decimalUsed)){
        if (operator == "") {
            firstNumber = (firstNumber.length < 12) ? firstNumber + target.textContent : firstNumber;
          display.textContent = firstNumber;
        } else {
            secondNumber = (secondNumber.length < 12) ? secondNumber + target.textContent : secondNumber;
            display.textContent = secondNumber;
        }

        if (target.id == "decimal") {
            decimalUsed = true;
        }
    }
    
}

function operationalButton(target) {
    if (target.id == "equals") {
        if (firstNumber && secondNumber) {
            answer = operate(firstNumber, secondNumber, operator);
            display.textContent = answer;
            firstNumber = "";
            secondNumber = "";
            decimalUsed = false;
            operator = "";
            
            allOperationalButtons.forEach(setOperationalButtonColor);
        } 
    } else if (operator != "") {
        answer = operate(firstNumber,secondNumber,operator);
        display.textContent = answer;
        firstNumber = answer;
        secondNumber = "";
        decimalUsed = false;
        operator = target.textContent;

        //the next operational button needs to still be highlighted after pressed
        allOperationalButtons.forEach(setOperationalButtonColor);
        target.style.backgroundColor = "#f70764";
    } else {
        decimalUsed = false;
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
    decimalUsed = false;
    operator = "";
    display.textContent = "0";
}

function negateNumber() {
    if (operator == "") {
        if (firstNumber != "") {
            firstNumber = String(Number(firstNumber) * -1);
            display.textContent = firstNumber;
        }
    } else {
        if (firstNumber != "") {
            secondNumber = String(Number(secondNumber) * -1);
            display.textContent = secondNumber;
        }
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
    return String(Number(a) + Number(b));
}

function subtract(a, b) {
    return String(Number(a) - Number(b));
}

function multiply(a, b) {
    return String(Number(a) * Number(b));
}

function divide(a, b) {
    if (b == 0) {
        return "big and spooky";
    }
    return String(Number(a) / Number(b));
}

function operate(a, b, operator) {
    switch(operator) {
        case "+":
            return fitScreen(add(a, b));
        case "-":
            return fitScreen(subtract(a, b));
        case "*":
            return fitScreen(multiply(a, b));
        case "/":
            return fitScreen(divide(a, b));
    }
}

//ensures that any long decimal is formatted so that
//there are 12 digits in the number, the size of the display screen
//if too big, 
function fitScreen(number) {
    if (number.length <= 12) {
        return number;
    }

    const lengthToDecimal = (number.split("").indexOf(".") != -1) 
                            ? number.slice(0, number.split("").indexOf(".") + 1).length
                            : number.length;

    if (lengthToDecimal > 12) {
        return String(Number(number).toExponential(6));
    } else {
        const roundToLength = 10 ** (12 - lengthToDecimal);
        return Math.round(number * roundToLength) / roundToLength;
    }
    
}