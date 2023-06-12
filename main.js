let digitButtons = document.querySelectorAll(".digit");
let label = document.querySelector("label");

let clearButton = document.querySelector(".clear");
let divButton = document.querySelector(".div");
let multButton = document.querySelector(".mult");
let addButton = document.querySelector(".add");
let subButton = document.querySelector(".sub");
let equalButton = document.querySelector(".equal");

let result = 0;
let lastDigit = 0;
let lastOperation = "null";
let lastTextContent = "";
let isLastDigit = true;

for (let i = 0; i < digitButtons.length; i++)
{
    let digit = (i + 1) % 10;
    digitButtons[i].onclick = function() {
        if (lastTextContent == "") {
            result = label.textContent = lastDigit =
            lastTextContent = digit;
            isLastDigit = true;
        }
        else if (isLastDigit)
        {
            lastDigit = lastDigit * 10 + digit;
            label.textContent += digit;
        }
        else {
            lastDigit = digit;
            label.textContent += digit;
            isLastDigit = true;
        }
        
        if (!isLastDigit)
            processResult();
    }
}

function processResult() {
    switch (lastOperation) {
        case "/":
            result /= lastDigit;
            break;
        case "*":
            result *= lastDigit;
            break;
        case "+":
            result += lastDigit;
            break;
        case "-":
            result -= lastDigit;
            break;
    }
    lastOperation = "null";
    isLastDigit = false;
}

function showResult() {
    if (!isLastDigit) {
        lastOperation = "null";
        isLastDigit = false;
    }
    else
        processResult();
    label.textContent = result;
    lastTextContent = result;
}

function processButton(operation) {
    if (!isLastDigit)
        label.textContent = lastTextContent;
    else
        processResult();
    
    lastOperation = operation;
    lastTextContent = label.textContent;
    label.textContent += " " + operation + " ";
}

clearButton.onclick = function() {
    result = 0;
    label.textContent = result;
    lastOperation = "null";
    lastTextContent = "";
}

divButton.onclick = function() {
    processButton("/");
}

multButton.onclick = function() {
    processButton("*");
}

addButton.onclick = function() {
    processButton("+");
}

subButton.onclick = function() {
    processButton("-");
}

equalButton.onclick = function() {
    showResult();
}