const ROUND_FACTOR = 1e5;
const ZERO_DIVISION_MESSAGE = `Please wait while the mathematicians come up with \
the result of your division...\n\n1/0 minutes left`;

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

function handleNumberInput(value) {
    // limit amount of numbers in input field
    if (displayResult.textContent.length === 10) return 0;

    // check for repeating dot
    if (value === "." && displayResult.textContent.includes(".")) return 0;
    
    // remove preceding zero
    if (displayResult.textContent === "0" && value !== ".") updateDisplayResult(value);
    else appendDisplayResult(value);
}

function handleOperationInput(currentOperation) {
    // allow to change chosen operation
    if (!isPreviousInputOperation) {
        // allow multiple operations without clicking by equality sign
        handleEqualityInput();
        firstNumber = firstNumber || displayResult.textContent;
    }
    operation = currentOperation;
    updateDisplayHistory(firstNumber + " " + currentOperation);
    clearDisplayResult();
    isPreviousInputOperation = true;
}

function handleEqualityInput() {
    if (operation === "") return 0;
    appendDisplayHistory(" " + displayResult.textContent + " =");

    // handle zero division
    if (displayResult.textContent === "0" && operation === "/") {
        alert(ZERO_DIVISION_MESSAGE);
        clearDisplay();
        resetVariables();
        return 0;
    }

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
    if (e.target.classList.contains("button-operation")) handleOperationInput(e.target.textContent);
    else isPreviousInputOperation = false;
    if (e.target.classList.contains("button-number")) handleNumberInput(e.target.textContent);
    if (e.target.classList.contains("button-equality")) handleEqualityInput();
    if (e.target.classList.contains("button-clear")) handleClearInput();
    if (e.target.classList.contains("button-delete")) handleDeleteInput();
}

function handleKeyboard(e) {
    console.log(e.key);
    if ("+-*/".includes(e.key)) handleOperationInput(e.key);
    else isPreviousInputOperation = false;
    if (e.key >= 0 && e.key <= 9 || e.key === ".") handleNumberInput(e.key);
    if (e.key === "Enter") handleEqualityInput();
    if (e.key === "Escape") handleClearInput();
    if (e.key === "Backspace") handleDeleteInput();
}

buttonContainer.addEventListener("click", handleEvent);
window.addEventListener("keydown", handleKeyboard);