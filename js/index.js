var input = document.getElementById('input');
var error = document.getElementById('error');

let noFirstNumber = 399,

    wrongNumberError = 404,

    numberZero = 0;


function number(button){
  // input.innerHTML += button.innerHTML
  inputString = input.innerHTML;
  var lastChar = inputString[inputString.length - 1];
  var almostLastChar = inputString[inputString.length - 2];

  var last = almostLastChar + lastChar
  
  console.log(`inputString`, inputString);
  console.log(`lastChar`, lastChar);
  console.log(`last`, last);

  switch (true){
    case [`/0`,`*0`,`-0`,`+0`].includes(last):
      console.log(`case 1`)
      newNumb = inputString.substring(0, inputString.length - 1) + button.innerHTML;
      input.innerHTML = newNumb;
    break
    case [`0`].includes(lastChar) && inputString.length == 1:
      console.log(`case 2`)
      newNumb = inputString.substring(0, inputString.length - 1) + button.innerHTML;
      input.innerHTML = newNumb;
    break
    default:
        input.innerHTML += button.innerHTML;
        error.innerHTML = ``;
        console.log(`DEFAULT`)
  } 
}

function operator(button){

  // Що не так з var в при викалика у другу функції

  inputString = input.innerHTML;
  console.log(inputString);
  var lastChar = inputString[inputString.length - 1];
  console.log(`lastChar`, lastChar);

  switch (true){
    case [`+`,`-`,`*`,`/`].includes(lastChar):
      console.log(`case 1`)
      newOper = inputString.substring(0, inputString.length - 1) + button.innerHTML;
      input.innerHTML = newOper;
    break
    case inputString.length == 0: 
      error.innerHTML = `Оператор не може бути першим`;
      myMove()
      throw new Error(noFirstNumber);
    default:
      input.innerHTML += button.innerHTML;
      console.log(`DEFAULT`)
  }

}


function calculate(){  
  var miracle = input.innerHTML;
  
  let separation = miracle.split(/(\+|\-|\*|\/)/);
  let number = [];
  let operator = [];

  for (var i = 0; i < separation.length; i++) {
    if(i % 2 === 0) {
      number.push(separation[i]);
    } else {
      operator.push(separation[i]);
    }
  }
  
  console.log(number)
  console.log(operator)

  var divide = operator.indexOf(`/`)
  var multiply = operator.indexOf(`*`)
  var minus = operator.indexOf(`-`)
  var plus = operator.indexOf(`+`)
      
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

function clr(){
  input.innerHTML = ``;

}



const newspaper = document.getElementById("error");

function myMove() {

  const newspaperSpinning = [
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
  
  const newspaperTiming = {
    duration: 2000,
    iterations: 1,
  }; 

  newspaper.animate(newspaperSpinning, newspaperTiming);

}




