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
  var indexLast = inputString.length - 1;
  // Переписати на slice  19 20
  var lastChar = inputString[indexLast];
  var twoLastChar = inputString.slice(-2);
  
  
  switch (true){
    case [`/0`,`*0`,`-0`,`+0`].includes(twoLastChar):
      newNumb = inputString.substring(0, indexLast) + button.innerHTML;
      input.innerHTML = newNumb;
    break;
    case [`0`].includes(lastChar) && inputString.length == 1:
      newNumb = inputString.substring(0, indexLast) + button.innerHTML;
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

  inputString = input.innerHTML;
  var indexLast = inputString.length - 1;
  var lastChar = inputString[indexLast];

  switch (true){
    case [`+`,`-`,`*`,`/`].includes(lastChar):
      newOper = inputString.substring(0, indexLast) + button.innerHTML;
      input.innerHTML = newOper;
    break;
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
  }
}

}


function calculate(){  
  var value = input.innerHTML;
  
  let separation = value.split(/(\-|\+|\*|\/)/);
  let number = [];
  let operator = [];
  
  if (separation[0] == ''){
    separation.splice(0, 3, separation[1] + separation[2]);
  }
  
  for (var i = 0; i < separation.length; i++) {
    if(i % 2 === 0) {
      number.push(Number(separation[i]));
    } else {
      operator.push(separation[i]);
    }
  }
 
  var divide = operator.indexOf(`/`);
  while (divide != -1) {
    number.splice(divide, 2, number[divide] / number[divide + 1]);
    operator.splice(divide, 1);
    divide = operator.indexOf("/");
  }

  var multiply = operator.indexOf(`*`);
  while (multiply != -1) {
    number.splice(multiply, 2, number[multiply] * number[multiply + 1]);
    operator.splice(multiply, 1);
    multiply = operator.indexOf("*");
  }

  var minus = operator.indexOf(`-`);
  while (minus != -1) {
    number.splice(minus, 2, number[minus] - number[minus + 1]);
    operator.splice(minus, 1);
    minus = operator.indexOf("-");
  }
  
  var plus = operator.indexOf(`+`);
  while (plus != -1) {
    number.splice(plus, 2, number[plus] + number[plus + 1]);
    operator.splice(plus, 1);
    plus = operator.indexOf("+");
  }
  
  input.innerHTML = ``;
  input.innerHTML += number ;
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
}
