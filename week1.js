const prompt = require('prompt-sync')();

function add(numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

function subtract(numbers) {
    return numbers.reduce((total, num) => total - num);
}

function multiply(numbers) {
    return numbers.reduce((total, num) => total * num, 1);
}

function divide(numbers) {
    return numbers.reduce((total, num) => {
        if (num === 0) {
            console.log("Cannot divide by zero!");
            process.exit();
        }
        return total / num;
    });
}

function calculator() {
    console.log("Simple Calculator");
    const operation = prompt("Choose an operation (add, subtract, multiply, divide): ").toLowerCase();
    const input = prompt("Enter numbers separated by spaces: ");
    const numbers = input.split(" ").map(Number);

    if (numbers.some(isNaN)) {
        console.log("Please enter only numbers.");
        return;
    }

    let result;
    if (operation === 'add') result = add(numbers);
    else if (operation === 'subtract') result = subtract(numbers);
    else if (operation === 'multiply') result = multiply(numbers);
    else if (operation === 'divide') result = divide(numbers);
    else {
        console.log("Invalid operation.");
        return;
    }

    console.log(`The result is: ${result}`);
}

calculator();
