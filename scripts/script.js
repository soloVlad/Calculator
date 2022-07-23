const displayResult = document.querySelector(".display-result");
const displayHistory = document.querySelector(".display-history");
const buttonContainer = document.querySelector(".button-container")


function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    switch(operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            return "Unsupported operation, sorry :(";
    }
}

function handleNumberInput(target) {
    let value = target.textContent;
    // check for repeating dot
    if (value === "." && displayResult.textContent.includes(".")) return 0;
    // remove preceding zero
    if (displayResult.textContent === "0") displayResult.textContent = value;
    else displayResult.textContent += value;
}

function handleEvent(e) {
    if (!e.target.classList.contains("button")) return 0;
    if (e.target.classList.contains("button-number")) handleNumberInput(e.target);
    
    console.log(e.target);
}

buttonContainer.addEventListener("click", handleEvent);
