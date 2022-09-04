let calcDisplay = document.querySelector(".calcDisplay");

// gets numbers from HTML
const nodeList= document.querySelectorAll(".numbers");
for (let i=0; i < nodeList.length; i++) {
  nodeList[i].addEventListener("click", enterDigit); 
}

const buttons= document.querySelectorAll("button");
for (let i=0; i < buttons.length; i++) {
  buttons[i].addEventListener("transitionend", removeAnimate); 
}

function removeAnimate(e) {
  console.log("remove animate")
  e.target.classList.remove("animate");
}


function add(num1, num2){
  return parseInt(num1) + parseInt(num2);
}

function subtract(num1, num2){
  return parseInt(num1) - parseInt(num2);
}
function multiply(num1, num2){
  return parseInt(num1) * parseInt(num2);
}
function divide(num1, num2){
  return parseInt(num1) / parseInt(num2);
}

function clickClear(){
    calcDisplay.innerText ="";
}

// operators
const operatorsList= document.querySelectorAll(".operators");
for (let i=0; i < operatorsList.length; i++) {
    operatorsList[i].addEventListener("click", enterOperator);
}

let operand1 = null;
let operator1 = null;
let result = null
let operatorSwitch = false;

function enterOperator(e){

//convert event object to text data
  if (e.target){
    e = e.target.innerText;
  }

  //Do Nothing
  if (calcDisplay.innerText=="" && operand1==null){return}
  //update operator
  else if (operatorSwitch=="true") {operator1 = e}
  //store operator and operand1
  else if (operand1==null) {
    operand1 = calcDisplay.innerText;
    operator1 = e;
    operatorSwitch = "true";
  }
  //calculate and update operator
  else {
      if (operator1 == "+"){result = add(operand1, calcDisplay.innerText);}
      if (operator1 == "-"){result = subtract(operand1, calcDisplay.innerText);}
      if (operator1 == "*"){result = multiply(operand1, calcDisplay.innerText);}
      if (operator1 == "/"){result = divide(operand1, calcDisplay.innerText);}
      calcDisplay.innerText = "";
      calcDisplay.innerText = result;

      if (e == '=') {operator1 = null}
      else {
        operand1 = result;
        operator1 = e;
        operatorSwitch = "true";
      }
  }
}

// gets keydown event keyCode
document.addEventListener("keydown", getKey);
function getKey(e){
  let key = null;

  //delete later for testing only
  console.log(e.keyCode);

  //test for all clear
  if (e.keyCode == 27 ){  
    key = document.querySelector(`.AC`);
    key.classList.add("animate");
    enterAC();
    return;
  }

  //test for delete
  if (e.keyCode == 8 || e.keyCode == 46){
    enterDelete();
    return;
  }

  //test for decimal
  if (e.keyCode == 190 || e.keyCode == 110){
    enterDecimal();
    return;
  }

    //test for percentage using shift + 5
    if (e.keyCode == 53){
      if (e.shiftKey){
      console.log("percentage pressed"); //for testing delete later
      key = document.querySelector(".percent");
      enterPercent();
      return;
      }
  }

  //test for add with shift key
  if (e.keyCode == 56){
      if (e.shiftKey){
      console.log("mult pressed"); //for testing delete later
      key = document.querySelector(`[data-keyOperator="${e.keyCode}"]`);
      enterOperator(key.innerText);
      return;
      }
  }

  //test for equals with shift key
  if (e.keyCode == 187){
      if (e.shiftKey){
      console.log("add pressed"); //for testing delete later
      //assign key as add
      key = "+";
      }
      else{
          console.log("equals pressed"); //for testing delete later
          //assign key as equals
          key = "=";
      }
      enterOperator(key);
      return;
  }

  

  //test for digit
  key = document.querySelector(`[data-keyDigit="${e.keyCode}"]`);
  if (key) {
      key.classList.add("animate");
      enterDigit(key);
      return;
  }

  //test for Operator - keypad
  key = document.querySelector(`[data-keyPadOperator="${e.keyCode}"]`);
  if (key) {
      key.classList.add("animate");
      enterOperator(key.innerText);
      return;
  }

  //test for Operator 
  key = document.querySelector(`[data-keyOperator="${e.keyCode}"]`);
  if (key) {
      key.classList.add("animate");
      enterOperator(key.innerText);
      return;
  }

  //do nothing if no operator or digit
  return;
}



const buttonDecimal = document.querySelector(".decimal")
buttonDecimal.addEventListener("click", enterDecimal)
function enterDecimal(){
  //if the display has a . do not add another .
  let num = calcDisplay.innerText
  if (num.indexOf(".") != -1) {return}
  calcDisplay.innerText += ".";
}

const buttonPercent = document.querySelector(".percent")
buttonPercent.addEventListener("click", enterPercent);
function enterPercent(){
  if(parseFloat(calcDisplay.innerHTML)){
    calcDisplay.innerHTML = parseFloat(calcDisplay.innerHTML) / 100;
  }
}

const buttonAC = document.querySelector(".AC")
buttonAC.addEventListener("click", enterAC);
function enterAC(){
  calcDisplay.innerHTML = "";
  operator1 = null;
  operand1 = null;
}

const buttonPosNeg = document.querySelector(".posNeg")
buttonPosNeg.addEventListener("click", enterPosNeg);
function enterPosNeg(){
  if (parseInt(calcDisplay.innerHTML)){
    calcDisplay.innerHTML = parseInt(calcDisplay.innerHTML) * -1;
  }
}



function enterDelete(){
  //if calcDisplay is empty do nothing
  if (calcDisplay.innerText == "") {return;}

  //otherwise delete the last entered digit
  let part = calcDisplay.innerText.slice(0, calcDisplay.innerText.length - 1);
  console.log("part is: " + part)
  calcDisplay.innerText = part;
}

function enterDigit(digit) {
  
  if (result != null && operator1 == null) {return}
  
  if (operatorSwitch != false) {
      calcDisplay.innerHTML = "";
      operatorSwitch = false;    
  }

  //display limit
  if (calcDisplay.innerHTML.length > 15){
    console.log("display limit")
    return;
  }
  

  if (digit.target){
      calcDisplay.innerHTML += digit.target.innerHTML;
  }
  else{
      calcDisplay.innerHTML += digit.innerHTML;
  }
        
}
