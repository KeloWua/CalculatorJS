const display = document.querySelector(".display");
const prevDisplay = document.querySelector(".prev-display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const dot = document.querySelector(".dot");
const clear = document.querySelector(".clear");
const negatif = document.querySelector(".negatif");

negatif.addEventListener("click", () => {
    if (display.value.length >= 1) {
    display.value = ('-' + display.value)
    if (display.value.charAt(1) == '-') {
        display.value = display.value.slice(1)
        if (display.value.charAt(0) == '-') {
        display.value = display.value.replace(/-/,'')
    }
    }
    
    }
})

clear.addEventListener("click", () => {
    display.value = "";
    prevDisplay.value = "";
    });

    let operatorsPressed;
    let newResult;

    numbers.forEach((number) => {
    number.addEventListener("click", () => {
        if (
        number.value !== "+" ||
        number.value !== "-" ||
        number.value !== "/" ||
        number.value !== "*" ||
        number.value !== "="
        ) {
        display.value += number.value;
        }
        let prevDispClean = prevDisplay.value.slice(0, -1);
        switch (number.value) {
        case "+":
        case "-":
        case "/":
        case "*":
            let displayLength = display.value.length;
            if (
            displayLength <= 1 &&
            (number.value == "+" ||
                number.value == "-" ||
                number.value == "/" ||
                number.value == "*" ||
                number.value == "=")
            ) {
            prevDisplay.value = prevDispClean + number.value;
            display.value = "";
            } else {
            prevDisplay.value = display.value;

            display.value = "";
            }

        default:
            break;
        }
        if (number.value == "=") {
        if (display.value.length <= 1) {
            display.value = "";
        }
        switch (operatorsPressed) {
            case "+":
            newResult =
                Number(prevDispClean) + Number(display.value.slice(0, -1));
            break;
            case "-":
            newResult =
                Number(prevDispClean) - Number(display.value.slice(0, -1));
            break;
            case "/":
            newResult =
                Number(prevDispClean) / Number(display.value.slice(0, -1));
            break;
            case "*":
            newResult =
                Number(prevDispClean) * Number(display.value.slice(0, -1));
            break;
            case "=":
            display.value = "";
            break;
            default:
            break;
        }
        if (prevDisplay.value !== "") {
            prevDisplay.value += display.value.slice(0, -1);
            display.value = newResult;
        }
        if (display.value.substring(display.value.length - 1) == "=") {
            display.value = display.value.slice(0, -1);
        }
        }
        if (display.value == "undefined") {
        display.value = "";
        }
        switch (prevDisplay.value) {
        case "+":
        case "-":
        case "/":
        case "*":
            prevDisplay.value = "";
            break;
        default:
            break;
        }
        if (display.value == ".") {
        display.value = "0.";
        }
        let prevLenght = prevDisplay.value.length;

        if (display.value.includes(".")) {
        display.value = removeDoubleDots(display.value);
        }
        if (
        display.value.charAt(0) == "0" &&
        display.value.charAt(1) !== "" &&
        display.value.charAt(1) !== "."
        ) {
        display.value = display.value.slice(1);
        }
    });
    });

    operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        operatorsPressed = operator.value;
    });
    });

    function removeDoubleDots(num) {
    let indices = [];
    for (let i = 0; i < num.length; i++) {
        if (num[i] === ".") indices.push(i);
    }
    let removeFromDot = num.substring(0, indices[1]);
    return removeFromDot;
}

