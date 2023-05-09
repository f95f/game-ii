let operation = sessionStorage.getItem("gameMode");
let operationSymbol = '';
let title = "";

let difficulty = 1;//, salt = 0;
let term1 = document.getElementById("term-1");
let term2 = document.getElementById("term-2");
let correctAnswer;
let optionsAmount = 5;
let answerOptions = [];
let buttonsExist = false;

let player = {

    level: 1,
    score: 0,
    lives: 10,
    questionAmount: 0,
    correctQuestions: 0,

}

let addition = function(){

    let salt = Math.pow(10, difficulty + 1) / 5;
    let value1 = getValue(salt);
    let value2 = getValue(salt);

    correctAnswer = calc(value1, value2);
    answerOptions = makeOptions(correctAnswer, optionsAmount, salt);
    
    displayQuestion(value1, value2, answerOptions);
}

let displayQuestion = function(value1, value2, answerOptions){

    term1.innerText = value1;  
    term2.innerText = value2;  
    
    if(!buttonsExist){ buttonsExist = makeButtons(); }
        
    let buttonArray = document.getElementsByClassName("answer-button");
    
    for(let item in answerOptions){
        
        buttonArray[item].innerText = answerOptions[item];

    }
    
}

let makeButtons = function(){

    let answerContainer = document.getElementById("answers");
    let option;
    let button;

    for(let i = 0; i < optionsAmount; i++){

        option = document.createElement("div");
        option.className = "answer-item";
        
        button = document.createElement("button");
        button.className = "answer-button";
        button.addEventListener("mouseup", function(){verify(answerOptions[i])});
        
        option.appendChild(button);
        answerContainer.appendChild(option);
    }

    return true;
}

let getValue = function(salt){
    
    return Math.floor(Math.random() * salt);

}

let calc = function(value1, value2){

    switch(operation){
        case 'addition': return value1 + value2;
        case 'subtraction':  return value1 - value2;
        case 'multiplication': return value1 * value2;                
        case 'division': return value1 / value2;
    }

}

let makeOptions = function(correctAnswer, optionsAmount, salt){

    let answerOptions = [];
    for(let i = 0; i < optionsAmount; i++){

        let value1 = getValue(salt);
        let value2 = getValue(salt);

        answerOptions[i] = calc(value1, value2);
    } 

    answerOptions[Math.floor(Math.random() * optionsAmount)] = correctAnswer;
    
    return answerOptions;

}

let verify = function(value){
    
    player.questionAmount++;

    if(value == correctAnswer){
        
        difficulty++;
        player.correctQuestions++;
        player.correctQuestions++;
        player.score = 2 * player.correctQuestions + 1;

    }
    else{

        player.lives--;
        
    }

    makeQuestionary();
}

let timeout = function(){

    player.lives--;
    makeQuestionary();

}

let makeQuestionary = function(){

    if(player.lives > 0){

        switch(operation){
            case 'addition': addition(); break;
            case 'subtraction':  addition(); break;
            case 'multiplication': addition(); break;          
            case 'division': addition(); break;
        }
        
    }

    //go to results.
}

switch(operation){

    case 'addition':
        title = "Adição"; 
        operationSymbol = '+';
        //addition();
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

makeQuestionary();
document.title += " " + title;
document.getElementById("title-operation").innerText = title;
document.getElementById("operation-symbol").innerText = operationSymbol;
