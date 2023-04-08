var input = document.getElementById('input'),
    error = document.getElementById('error');

var inputString,
    newNumb,
    newStr,
    newOper,
    result;

let noFirstNumber = 402,
    zeroOperator = 403,
    noStringWalue = 404;



function number(button){
  inputString = input.innerHTML;

  var lastChar = inputString[inputString.length - 1];
  var almostLastChar = inputString[inputString.length - 2];

  var last = almostLastChar + lastChar;
  
  switch (true){
    case [`/0`,`*0`,`-0`,`+0`].includes(last):
      newNumb = inputString.substring(0, inputString.length - 1) + button.innerHTML;
      input.innerHTML = newNumb;
    break;
    case [`0`].includes(lastChar) && inputString.length == 1:
      newNumb = inputString.substring(0, inputString.length - 1) + button.innerHTML;
      input.innerHTML = newNumb;
      error.innerHTML = ``;
    break;
    default:
        input.innerHTML += button.innerHTML;
        error.innerHTML = ``;
  } 
}

function operator(button){
try {
  // Що не так з var в при виклику у другу функції

  inputString = input.innerHTML;

  var lastChar = inputString[inputString.length - 1];
  var almostLastChar = inputString[inputString.length - 2];

  var last = almostLastChar + lastChar;

  switch (true){
    case [`+`,`-`,`*`,`/`].includes(lastChar):
      newOper = inputString.substring(0, inputString.length - 1) + button.innerHTML;
      input.innerHTML = newOper;
    break;
    // case [`0`].includes(lastChar) && inputString.length == 1:
    //   error.innerHTML = `Після нуля не можу бути оператора`;
    //   myMove();
    //   throw new Error(zeroOperator);
    case inputString.length == 0:       
      error.innerHTML = `Оператор не може бути першим`;
      throw new Error(noFirstNumber);
    default:
      input.innerHTML += button.innerHTML;
      error.innerHTML = ``;
  }

} catch (error) {
  switch(true) {
    case (error.message == noFirstNumber):
      myMove();
    break;
    // case (error.message == zeroOperator):
    //   myMove();
    // break;
  }
}

}


function calculate(){  
  var miracle = input.innerHTML;
  
  let separation = miracle.split(/(\+|\-|\*|\/)/);
  let number = [];
  let operator = [];

  if (separation[0] == ''){
    separation.splice(0, 3, separation[1] + separation[2]);
  }

  for (var i = 0; i < separation.length; i++) {
    if(i % 2 === 0) {
      number.push(separation[i]);
    } else {
      operator.push(separation[i]);
    }
  }
  
  var divide = operator.indexOf(`/`);
  var multiply = operator.indexOf(`*`);
  var minus = operator.indexOf(`-`);
  var plus = operator.indexOf(`+`);
      
  while (divide != -1) {
    number.splice(divide, 2, result = Number(number[divide]) / Number(number[divide + 1]));
    operator.splice(divide, 1);
    divide = operator.indexOf("/");
  }
  while (multiply != -1) {
    number.splice(multiply, 2, result = Number(number[multiply]) * Number(number[multiply + 1]));
    operator.splice(multiply, 1);
    multiply = operator.indexOf("*");
  }
  while (minus != -1) {
    number.splice(minus, 2, result = Number(number[minus]) - Number(number[minus + 1]));
    operator.splice(minus, 1);
    minus = operator.indexOf("-");
  }
  while (plus != -1) {
    number.splice(plus, 2, result = Number(number[plus]) + Number(number[plus + 1]));
    operator.splice(plus, 1);
    plus = operator.indexOf("+");
  }

  input.innerHTML = ``;
  input.innerHTML += result ;
}

function allClear(){
  input.innerHTML = ``;
  error.innerHTML = ``;
}

function clearLast(){
try{

  inputString = input.innerHTML;
  
  newStr = inputString.substring(0, inputString.length - 1);
  input.innerHTML = newStr;

  if (inputString.length == 0){
    error.innerHTML = `Тут вже пусто`;
    throw new Error(noStringWalue);
  }

} catch (error) {
  switch(true) {
    case (error.message == noStringWalue):
      myMove();
    break;
    // case (error.message == zeroOperator):
    //   myMove();
    // break;
  }
}
}

function myMove() {

  const errorSpinning = [
    { color: `yellow`,
      transform: `scale(0)`,
      opacity: `0`,
     },
    { color: `red`,
      transform: `scale(2)`,
      opacity: `1`, },      
    { color: `yellow`,
      transform: `scale(1)`,
      opacity: `1`, },
    { transform: `scale(1)`,
      opacity: `1`, },
  ];
  
  const errorTiming = {
    duration: 2000,
    iterations: 1,
  }; 

  error.animate(errorSpinning, errorTiming);
  inputString = input.innerHTML;

  var lastChar = inputString[inputString.length - 1];


}

const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.splice(0, array1[0] + array1[2]);

console.log(array3);