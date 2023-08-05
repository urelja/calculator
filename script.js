const numbers = document.querySelectorAll('.numbers > *')
const operators = document.querySelectorAll('.operator')
const equals = document.querySelector('.equals')
const result = document.querySelector('.result')
const ac = document.querySelector('.ac')
const prefix = document.querySelector('.prefix')

let firstNumber, secondNumber, currentOperator = null, previousOperator = null, previousNumber = null
let number = []
let n = 0
let addPrefix = false

numbers.forEach((i) => {
    i.addEventListener('mousedown',inputNumber)
})

operators.forEach((i) => {
    i.addEventListener('mousedown',operatorClicked)
})

equals.addEventListener('mousedown',() => evaluate(currentOperator))

ac.addEventListener('mousedown',clear)

prefix.addEventListener('mousedown',changePrefix)

function changePrefix() {
    if (addPrefix == false && number.length !== 0) {
        number.splice(0,0,'-')
        result.textContent = number.join('')
        addPrefix = true
    } else if (addPrefix == true && number.length !== 0) {
        number.shift()
        result.textContent = number.join('')
        addPrefix = false
    }
}

function clear() {
    result.textContent = 0
    number = []
    currentOperator = null
    previousOperator = null
    previousNumber = null
    firstNumber = null
    secondNumber = null
}

function inputNumber(e) {
    if ((e.target.textContent == '0' && result.textContent == '0') || number.length >= 10) {
        return
    }
    if (e.target.textContent == '.') {
        if (number.includes('.')) {
            return
        }
        if (number.length == 0) {
            number.push('0')
        }
        
        
    }

    number.push(e.target.textContent)
    result.textContent = number.join('')
}

function operatorClicked(e) {
    currentOperator = e.target.textContent

    if (firstNumber == null) {
        previousOperator = e.target.textContent
        previousNumber = result.textContent
        firstNumber = parseFloat(result.textContent)
    } else if (secondNumber == null) {
        if (currentOperator == previousOperator || previousNumber == result.textContent){
            return
        }
        secondNumber = parseFloat(result.textContent)
        evaluate(previousOperator)
        firstNumber = parseFloat(result.textContent)
        secondNumber = null
        previousOperator = e.target.textContent
        previousNumber = result.textContent
    }
    number = []
}

function evaluate(operator) {
    

    if (previousOperator == '=') {
        return
    }

    previousOperator = '='

    if (firstNumber == null) {
        firstNumber = parseFloat(result.textContent)
    } 
    
    if (secondNumber == null) {
        secondNumber = parseFloat(result.textContent)
    }

    if (secondNumber == 0 && operator == '/') {
        alert('Cannot divide by zero')
        firstNumber = null
        secondNumber = null
        result.textContent = '0'
        number = []
        return
    }

    if (operator == '+') {
        result.textContent = roundToX(add(firstNumber,secondNumber))
    } else if (operator == '-') {
        result.textContent = roundToX(subtract(firstNumber,secondNumber))
    } else if (operator == '/') {
        result.textContent = roundToX(divide(firstNumber,secondNumber))
    } else if (operator == '*') {
        result.textContent = roundToX(multiply(firstNumber,secondNumber))
    }

    firstNumber = null
    secondNumber = null

    number = []
}

function divide(fnum,snum) {
    return fnum / snum
}

function multiply(fnum,snum) {
    return fnum * snum
}

function add(fnum,snum) {
    return fnum + snum
}

function subtract(fnum,snum) {
    return fnum - snum
}

function roundToX(num, X=4) {    
    return +(Math.round(num + "e+"+X)  + "e-"+X);
}