const prevDisplay = document.querySelector('.previous');
const currDisplay = document.querySelector('.current');
//instantiate the Calculator class
const calculator = new Calculator(prevDisplay, currDisplay);

const numberButtons = document.querySelectorAll('.numbers');
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerHTML);
    //display numbers
    calculator.updateDisplay();
    //stop event from bubbling up
    event.stopPropagation();
  });
});

const operationButtons = document.querySelectorAll('.operations');
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerHTML);
    calculator.updateDisplay();
    //stop event from bubbling up
    event.stopPropagation();
  });
});

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

const signButton = document.querySelector('.sign');
signButton.addEventListener('click', () => {
  calculator.sign();
  calculator.updateDisplay();
});

const percentageButton = document.querySelector('.percentage');
percentageButton.addEventListener('click', () => {
  calculator.percentage();
  calculator.updateDisplay();
});

const memoryAddButton = document.querySelector('.memoryAdd');
memoryAddButton.addEventListener('click', () => {
  calculator.memoryAdd(currDisplay.innerText);
});

const memoryRemoveButton = document.querySelector('.memoryRemove');
memoryRemoveButton.addEventListener('click', () => {
  calculator.memoryRemove();
});

const memoryRecallButton = document.querySelector('.memoryRecall');
memoryRecallButton.addEventListener('click', () => {
  calculator.recallClicked += 1;
  calculator.memoryRecall();
  calculator.updateDisplay();
});

const equalsButton = document.querySelector('.equals');
equalsButton.addEventListener('click', () => {
  calculator.calculate();
  calculator.updateDisplay();
});

//handle keystrokes
window.addEventListener('keyup', (event) => {
  event.preventDefault();
  if ((event.key >= 0 && event.which >= 48) && (event.key <= 9 && event.which <= 57)) {
    calculator.appendNumber(event.key);
    calculator.updateDisplay();
  }
  //clear key
  if (event.key === 'Escape' && event.which === 27) {
    calculator.clear();
    calculator.updateDisplay();
  }
  //period key
  if (event.key === '.' && event.which === 190) {
    calculator.appendNumber(event.key);
    calculator.updateDisplay();
  }
  //equals key
  if ((event.key === 'Enter')) {
    calculator.calculate();
    calculator.updateDisplay();
  }
  //divide
  if (event.key === '/' && event.which === 191) {
    calculator.chooseOperation('÷');
    calculator.updateDisplay();
  }
  //multiply
  if (event.key === '*' && event.which === 56) {
    calculator.chooseOperation('x');
    calculator.updateDisplay();
  }
  //minus
  if (event.key === '-' && event.which === 189) {
    calculator.chooseOperation('-');
    calculator.updateDisplay();
  }
  //add
  if (event.keyCode === 187) {
    calculator.chooseOperation('+');
    calculator.updateDisplay();
  }
});
