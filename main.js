const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display .input')
const display_output = document.querySelector('.display .output')

let input = "";
let operators = ["*", "/", "+", "-"];
for (const key of keys) {
    const value = key.dataset.key;

    key.addEventListener('click', () => {
        if (value == 'clear') {
            input = '';
            display_input.innerHTML = '';
            display_output.innerHTML = '';
        } else if (value == 'backspace') {
            input = input.slice(0, -1);
            display_input.innerHTML = CleanInput(input);

        } else if (value == "=") {
            let result = eval(PerpareInput(input))

            display_output.innerHTML = CleanOutput(result);
        } else if (value == 'brackets') {
            if (
                operators.includes(input.split('')[input.length - 1]) &&
                input.split('')[input.length - 1] != ')' && (
                    input.indexOf('(') == -1 ||
                    input.indexOf("(") != -1 &&
                    input.indexOf(")") != -1 &&
                    input.lastIndexOf("(") < input.lastIndexOf(")"))) {
                console.log(input.split('')[input.length - 1]);
                input += "("
            } else if (
                !operators.includes(input.split('')[input.length - 1]) &&
                input.split('')[input.length - 1] != '(' && (
                    input.indexOf("(") != -1 &&
                    input.indexOf(")") == -1 ||
                    input.indexOf("(") != -1 &&
                    input.indexOf(")") != -1 &&
                    input.lastIndexOf("(") > input.lastIndexOf(")"))) {
                console.log(operators.includes(input.split('')[input.length - 1]));

                input += ")"
            }
            display_input.innerHTML = CleanInput(input);
        } else {
            console.log(input, input.length, value.length);
            if (value.length == 1 && input.length == 0 && operators.includes(value)) {
                return false
            }
            if (ValidateInput(value)) {
                if (display_output.textContent.length) {
                    input = '';
                    display_input.innerHTML = '';
                    display_output.innerHTML = '';
                }
                input += value
                display_input.innerHTML = CleanInput(input)
            }
        }
    })
}

function CleanInput(input) {
    let input_array = input.split("")
    let input_array_length = input_array.length
    for (let i = 0; i < input_array_length; i++) {
        if (input_array[i] == "/") {
            input_array[i] = `<span class='operator'>/</span>`
        } else if (input_array[i] == "*") {
            input_array[i] = `<span class='operator'>×</span>`
        }
        else if (input_array[i] == "+") {
            input_array[i] = `<span class='operator'>+</span>`
        }
        else if (input_array[i] == "-") {
            input_array[i] = `<span class='operator'>-</span>`
        }
        else if (input_array[i] == "(") {
            input_array[i] = `<span class='brackets'>(</span>`
        }
        else if (input_array[i] == ")") {
            input_array[i] = `<span class='brackets'>)</span>`
        }
        else if (input_array[i] == "%") {
            input_array[i] = `<span class='percent'>%</span>`
        }
    }

    return input_array.join("")
}
function CleanOutput(output) {
    let output_string = output.toString();
    let decimal = output_string.split(".")[1];
    output_string = output_string.split(".")[0];

    let output_array = output_string.split('');
    if (output_array.length > 3) {
        for (let i = output_array.length - 3; i > 0; i -= 3) {
            output_array.splice(i, 0, ',');
        }
    }
    if (decimal) {
        output_array.push('.');
        output_array.push(decimal);
    }
    if (output_array.includes('.')) {
        return (Math.round(output_array.join("") * 100) / 100).toFixed(2)
    } else {
        return output_array.join("");
    }
}

function ValidateInput(value) {
    let last_input = input.slice(-1);
    if (value == "." && last_input == '.') {
        return false
    }
    if (operators.includes(value)) {
        if (operators.includes(last_input)) {
            return false
        } else {
            return true
        }
    }
    return true
}

function PerpareInput(input) {
    let input_array = input.split("")

    for (let i = 0; i < input_array.length; i++) {
        if (input_array[i] == "%") {
            input_array[i] = "/100";
        }
    }
    return input_array.join("");
}