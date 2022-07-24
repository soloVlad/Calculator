const ROUND_FACTOR = 1e5;
const displayResult = document.querySelector(".display-result");
const displayHistory = document.querySelector(".display-history");
const buttonContainer = document.querySelector(".button-container")

let firstNumber = 0;
let operation = "";
let isPreviousInputOperation = false;

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
    isPreviousInputOperation = false;
}

function roundResult(number) {
    return Math.round(number * ROUND_FACTOR) / ROUND_FACTOR;
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
    // allow to change chosen operation
    if (!isPreviousInputOperation) {
        // allow multiple operations without clicking by equality sign
        handleEqualityInput();
        firstNumber = firstNumber || displayResult.textContent;
    }
    operation = target.textContent;
    updateDisplayHistory(firstNumber + " " + operation);
    clearDisplayResult();
    isPreviousInputOperation = true;
}

function handleEqualityInput() {
    if (operation === "") return 0;
    appendDisplayHistory(" " + displayResult.textContent + " =");
    let result = operate(operation, +firstNumber, +displayResult.textContent);
    let roundedResult = roundResult(result);
    // allow multiple operations without clicking by equality sign
    firstNumber = roundedResult;
    updateDisplayResult(roundedResult);
    resetVariables();
}

function handleClearInput() {
    clearDisplay();
    resetVariables();
}

function handleDeleteInput() {
    let currentDisplayResult = displayResult.textContent;
    let newDisplayResult = currentDisplayResult.slice(0, currentDisplayResult.length - 1) || "0";
    updateDisplayResult(newDisplayResult);
}

function handleEvent(e) {
    if (!e.target.classList.contains("button")) return 0;
    if (e.target.classList.contains("button-operation")) handleOperationInput(e.target);
    else isPreviousInputOperation = false;
    if (e.target.classList.contains("button-number")) handleNumberInput(e.target);
    if (e.target.classList.contains("button-equality")) handleEqualityInput();
    if (e.target.classList.contains("button-clear")) handleClearInput();
    if (e.target.classList.contains("button-delete")) handleDeleteInput();
}

buttonContainer.addEventListener("click", handleEvent);
