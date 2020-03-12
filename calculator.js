class Calculator {
  constructor(prevDisplay, currDisplay) {
    this.prevDisplay = prevDisplay;
    this.currDisplay = currDisplay;
    this.memoryArray = [];
    this.recallClicked = 0;
    //as soon as app started, run clear method
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = '';
    this.recallClicked = 0;
  }

  memoryAdd(num) {
    if (this.currentOperand === '') return;
    //if that number has already been stored, do nothing.
    if (this.memoryArray.includes(num)) return;
    this.memoryArray.push(num);
  }

  memoryRemove() {
    if (this.memoryArray.length === 0) return;
    //remove the specific number currently displayed if it exist in this.memoryArray
    let removedItem = '';
    if (this.memoryArray.includes(this.currentOperand) && this.memoryArray.indexOf(this.currentOperand) > -1) {
      removedItem = this.memoryArray.splice(this.memoryArray.indexOf(this.currentOperand), 1);
    } else {
      //remove the last num in the memory
      this.memoryArray.pop();
    }
  }

  memoryRecall() {
    if (this.memoryArray.length === 0) return;
    //recalls the last number entered
    if (this.recallClicked > this.memoryArray.length) return;
    //recall the last number added to memory
    this.currentOperand = this.memoryArray[this.memoryArray.length - this.recallClicked];
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