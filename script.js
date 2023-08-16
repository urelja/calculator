const numbers = document.querySelectorAll('.numbers > *')
const operators = document.querySelectorAll('.operator')
const equals = document.querySelector('.equals')
const result = document.querySelector('.result')
const ac = document.querySelector('.ac')
const prefix = document.querySelector('.prefix')
const operatorList = ['+','-','/','*','=']

let firstNumber, secondNumber, currentOperator = null, previousOperator = null, previousNumber = null
let number = []
let n = 0
let addPrefix = false
let noprefix

numbers.forEach((i) => {
    i.addEventListener('mousedown',inputNumber)
})

operators.forEach((i) => {
    i.addEventListener('click',operatorClicked)
})

equals.addEventListener('click',() => evaluate(currentOperator))

ac.addEventListener('mousedown',clear)

prefix.addEventListener('mousedown',changePrefix)

document.addEventListener('keydown',(e) => {
    e.preventDefault()
    if (e.key < 10) {
        number.push(e.key)
        result.textContent = number.join('')
    } else if (operatorList.includes(e.key)) {
        let buttonToClick = document.querySelector(`[data-operator='${e.key}']`)
        buttonToClick.click()
    } else if (e.key == 'Enter') {
        equals.click()
    }
})

function changePrefix() {
    if (addPrefix == false && number.length !== 0) {
        result.textContent = '-'+result.textContent
        addPrefix = true
    } else if (addPrefix == true && number.length !== 0) {
        noprefix = Array.from(result.textContent)
        noprefix.shift()
        result.textContent = noprefix.join('')
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
    addPrefix = false
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