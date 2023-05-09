let operation = sessionStorage.getItem("gameMode");
let operationSymbol = '';
let title = "";

let difficulty = 1;
let term1 = document.getElementById("term-1");
let term2 = document.getElementById("term-2");
let correctAnswer;
let answerOptions = []

let addition = function(){

    term1.innerText = getValue(Math.pow(10, difficulty +1));
    term2.innerText = getValue(Math.pow(10, difficulty +1));

}

let getValue = function(multiplier){
    
    return Math.floor(Math.random() * multiplier);

}

switch(operation){

    case 'addition':
        title = "Adição"; 
        operationSymbol = '+';
        addition();
    break;
        
    case 'subtraction':
        title = "Subtração";
    break;
    
    case 'multiplication':
        title = "Multiplicação";    
        
    break;
    
    case 'division':
        title = "Divisão";    
    break;

}

document.title += " " + title;
document.getElementById("operation-symbol").innerText = operationSymbol;

