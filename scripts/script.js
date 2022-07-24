const displayResult = document.querySelector(".display-result");
const displayHistory = document.querySelector(".display-history");
const buttonContainer = document.querySelector(".button-container")

let firstNumber = 0;
let operation = "";

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

function clearDisplayResult() {
    displayResult.textContent = "0";
}

function clearDisplayHistory() {
    displayHistory.textContent = "";
}

function clearDisplay() {
    clearDisplayResult();
    clearDisplayHistory();
}

function updateDisplayResult (result) {
    displayResult.textContent = result;
}

function appendDisplayResult (appendix) {
    displayResult.textContent += appendix;
}

function updateDisplayHistory (history) {
    displayHistory.textContent = history;
}

function appendDisplayHistory (appendix) {
    displayHistory.textContent += appendix;
}

function resetVariables() {
    firstNumber = 0;
    operation = "";
}

function handleNumberInput(target) {
    let value = target.textContent;
    // check for repeating dot
    if (value === "." && displayResult.textContent.includes(".")) return 0;
    // remove preceding zero
    if (displayResult.textContent === "0" && value !== ".") updateDisplayResult(value);
    else appendDisplayResult(value);
}

function handleOperationInput(target) {
    firstNumber = displayResult.textContent;
    operation = target.textContent;
    updateDisplayHistory(firstNumber + " " + operation);
    clearDisplayResult();
}

function handleEqualityInput() {
    if (operation === "") return 0;
    appendDisplayHistory(displayResult.textContent + " =");
    let result = operate(operation, +firstNumber, +displayResult.textContent);
    updateDisplayResult(result);
    resetVariables();
}

function handleEvent(e) {
    if (!e.target.classList.contains("button")) return 0;
    if (e.target.classList.contains("button-number")) handleNumberInput(e.target);
    if (e.target.classList.contains("button-operation")) handleOperationInput(e.target);
    if (e.target.classList.contains("button-equality")) handleEqualityInput();

    console.log(e.target);
}

buttonContainer.addEventListener("click", handleEvent);
