const display = document.querySelector(".display");
const prevDisplay = document.querySelector(".prev-display");
const numbers = document.querySelectorAll(".number");
const operands = document.querySelectorAll(".operand");
const clear = document.querySelector(".clear");
const deleteLast = document.querySelector(".delete");
const negatif = document.querySelector(".negatif");
import debugMonitor from './debugMonitor.js'
// debugger for monitoring HTML object to check which line changes it using console.trace() => (object: display, property:"value" property must be string.)
// debugMonitor(prevDisplay, "value")
// debugMonitor(display, "value")

let operandsPressed;
let newResult;


negatif.addEventListener("click", () => {
    if (display.value.length >= 1) {
        display.value = ('-' + display.value);
        if (display.value.charAt(1) == '-') {
            display.value = display.value.slice(1);
            if (display.value.charAt(0) == '-') {
            display.value = display.value.replace(/-/, '');
            }
        }
    }
});

clear.addEventListener("click", () => {
    display.value = "";
    prevDisplay.value = "";
});
deleteLast.addEventListener('click', deleteLastChar);

numbers.forEach((number) => {
    number.addEventListener("click", () => {
        calculator(number.value)
    });
});


function calculator(num) {        
        display.value += num;
        if (num) {
            switch (num) {
            case "+":
            case "-":
            case "/":
            case "*":
                if (display.value.length <= 1 && ["+","-","/","*","="].includes(num)) {
                    //changes second number operand to last operand pressed
                    prevDisplay.value = prevDisplay.value.slice(0, -1) + num;
                    //avoids displaying multiple operands
                    display.value = "";
                } else {
                    //moves main screen number to second screen waiting for the second number to operate with
                    prevDisplay.value = display.value;
                    display.value = "";
                }
            default:
                break;
        }
        dotDealer()

        IfEqual(num)

        if (["undefined", "Infinity"].includes(display.value)) {
            display.value = "";
        }
        switch (prevDisplay.value) {
            case "+":
            case "-":
            case "/":
            case "*":
            // avoids entering operands into main screen => that will move to second screen without numbers, avoids crashing by clearing second display if operands entered without any length on second screen.
            prevDisplay.value = ''
                break;
            default:
                break;
        }
};

function operandsWithoutNumbers(prevDisp) {
    switch (prevDisplay.value) {
                case "+":
                case "-":
                case "/":
                case "*":
                // avoids entering operands into main screen => that will move to second screen without numbers, avoids crashing by clearing second display if operands entered without any length on second screen.
                    prevDisplay.value = ''
                    break;
                default:
                    break;
            }
}
};

function IfEqual(numVal) {
        // main and second screen numbers without operand (last char)
        let prevDispCleanNum = prevDisplay.value.slice(0, -1);
        let dispCleanNum = display.value.slice(0, -1);

    if (numVal == "=") {

            if (display.value.length <= 1) {
                display.value = "";
            }
            
            switch (operandsPressed) {
                case "+":
                    newResult =
                        Number(prevDispCleanNum) + Number(dispCleanNum);
                    break;
                case "-":
                    newResult =
                        Number(prevDispCleanNum) - Number(dispCleanNum);
                    break;
                case "/":
                    newResult =
                        Number(prevDispCleanNum) / Number(dispCleanNum);
                    break;
                case "*":
                    newResult =
                        Number(prevDispCleanNum) * Number(dispCleanNum);
                    break;
                case "=":
                    display.value = "";
                    break;
                default:
                    break;
            }
            //cleans last '=' from main screen before adding it to second screen.
            if (prevDisplay.value !== "") {
                prevDisplay.value += display.value.slice(0, -1);
                display.value = newResult; 
            }
            //cleans last '=' from main screen if incase it has not been cleaned
            if (display.value.substring(display.value.length - 1) == "=") {
                display.value = display.value.slice(0, -1);
            }
        }
}
function deleteLastChar() {
    if (display.value.length >= 1) {
    display.value = display.value.slice(0, -1)
}};


function dotDealer() {
        if (display.value == ".") {
            display.value = "0.";
        }
        if (display.value.includes(".")) {
            display.value = removeDoubleDots(display.value);
        }
        //avoids starting number with 0
        if (
            display.value.charAt(0) == "0" &&
            display.value.charAt(1) !== "" &&
            display.value.charAt(1) !== "."
        ) {
            display.value = display.value.slice(1);
        }
}

operands.forEach((operand) => {
    operand.addEventListener("click", () => {
        operandsPressed = operand.value;
    });
});

function removeDoubleDots(num) {
    let indices = [];
    for (let i = 0; i < num.length; i++) {
        if (num[i] === ".") {
            indices.push(i);
        }};
    let removeFromDot = num.substring(0, indices[1]);
    return removeFromDot;
}
