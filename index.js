// define all variables
//displays
const prevDisplay = document.querySelector('.previous');
const currDisplay = document.querySelector('.current');

//special buttons
const clearButton = document.querySelector('.clear');
const memoryRecallButton = document.querySelector('.memoryRecall');
const memoryAddButton = document.querySelector('.memoryAdd');
const memoryRemoveButton = document.querySelector('.memoryRemove');
const percentageButton = document.querySelector('.percentage');
const signButton = document.querySelector('.sign');
const equalsButton = document.querySelector('.equals');

//number buttons
const numberButtons = document.querySelectorAll('.numbers');
//operation buttons
const operationButtons = document.querySelectorAll('.operations');

//create a Calculator class with methods for use in operations
class Calculator {
  constructor(prevDisplay, currDisplay) {
    this.prevDisplay = prevDisplay;
    this.currDisplay = currDisplay;
    //as soon as app started, run clear method
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = '';
  }

  sign() {
    if (this.currentOperand === '') return;
    this.currentOperand = this.currentOperand.charAt(0) === '-' ? this.currentOperand.slice(1) : `-${this.currentOperand}`;
  }

  percentage() {
    if (this.currentOperand === '') return;
    this.currentOperand = `${parseFloat(this.currentOperand / 100)}`;
  }

  appendNumber(num) {
    //check if period already exist
    if (num === '.' && this.currentOperand.toString().includes('.')) return;
    if (num === '.' && this.currentOperand === '') {
      this.currentOperand = `0${num}`;
    } else {
      this.currentOperand = this.currentOperand.toString() + num.toString();
    }
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    //if there is already number entered run the calculation
    if (this.previousOperand !== '') this.calculate();
    this.operation = operation;
    this.previousOperand = `${this.currentOperand}${this.operation}`;
    this.currentOperand = '';
  }

  updateDisplay() {
    this.currDisplay.innerText = this.currentOperand;
    this.prevDisplay.innerText = this.previousOperand;
  }

  calculate() {
    //if there is no input, return nothing
    if (this.previousOperand === '' && this.currentOperand === '') return;

    let result = null;
    const prevItem = parseFloat(this.previousOperand);
    const curItem = parseFloat(this.currentOperand);

    switch (this.operation) {
      case '÷':
        result = prevItem / curItem;
        break;
      case 'x':
        result = prevItem * curItem;
        break;
      case '-':
        result = prevItem - curItem;
        break;
      case '+':
        result = prevItem + curItem;
        break;
      default:
        return;
    }
    //put result to currentOperand
    this.currentOperand = result < .01 ? result.toPrecision(4) : result.toFixed(2);
    //set previousOperand and operation to empty string
    this.previousOperand = '';
    this.operation = '';
  }
}

//instantiate the Calculator class
const calculator = new Calculator(prevDisplay, currDisplay);

//number buttons handler
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerHTML);
    //display numbers
    calculator.updateDisplay();
  });
});

//operation buttons handler
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerHTML);
    calculator.updateDisplay();
  });
});

clearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

signButton.addEventListener('click', () => {
  calculator.sign();
  calculator.updateDisplay();
});

percentageButton.addEventListener('click', () => {
  calculator.percentage();
  calculator.updateDisplay();
});

equalsButton.addEventListener('click', () => {
  calculator.calculate();
  calculator.updateDisplay();
});