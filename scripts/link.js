let operation = sessionStorage.getItem("gameMode");
let operationSymbol = '';
let title = "";
let answerStatus = "";

let difficulty = 1;
let term1 = document.getElementById("term-1");
let term2 = document.getElementById("term-2");
let timebar = document.getElementById("timebar-filled");
let correctAnswer;
let optionsAmount = 4;
let answerOptions = [];

let timebarWidth = 100;
let buttonsExist = false;
let lifebarExist = false;
let timeValue = 50;
let intervalId;

let pausas = 3;

let player = {
    
    level: 1,
    score: 0,
    lives: 10,
    mode: '',
    questionAmount: 1,
    correctQuestions: 0,
    
}

let maxLives = player.lives;

let addition = function(){

    let salt = Math.pow(5, (difficulty / 3) + 1) / 3;
    let value1 = getValue(salt);
    let value2 = getValue(salt);
    
    correctAnswer = calc(value1, value2);
    answerOptions = makeOptions(correctAnswer, optionsAmount, salt);
    
    displayQuestion(value1, value2, answerOptions);
}

let subtraction = function(){

    let salt = (Math.pow(3, (difficulty / 3) + 1) / 3) + 8;
    let value1 = getValue(salt);
    let value2 = getValue(salt);
    
    correctAnswer = calc(value1, value2);
    answerOptions = makeOptions(correctAnswer, optionsAmount, salt);
    
    displayQuestion(value1, value2, answerOptions);
}

let multiplication = function(){
    
    let salt;
    if(difficulty <= 10){  salt = difficulty + 10; }
    else if(difficulty < 20){           salt = (difficulty - 10) * difficulty; }

    let value1 = getValue(salt);
    let value2 = getValue(salt);

    correctAnswer = calc(value1, value2);
    answerOptions = makeOptions(correctAnswer, optionsAmount, salt);
    
    displayQuestion(value1, value2, answerOptions);

}

let division = function(){
    
    let salt = (Math.pow(5, (difficulty / 3) + 1)) + 100;
    
    let value1;
    let value2 = Math.floor(Math.random() * 5) + 1;
    
    let auxVerifier;

    do{
        auxVerifier = true;
        value1 = getValue(salt) + 1;
        
        correctAnswer = calc(value1, value2);
        answerOptions = makeOptions(correctAnswer, optionsAmount, salt);
        
        for(let i = 0; i < optionsAmount; i++){

            if(!isFinite(answerOptions[i])){

                answerOptions[i] = getValue(salt) + 1;
            }

            if(answerOptions[i] != correctAnswer){ 
                
                answerOptions[i] = Math.floor(answerOptions[i] * 10);
                
                if(getValue(2) == 1){answerOptions[i] += correctAnswer;}
                if(answerOptions[i] == correctAnswer){ answerOptions[i] -= correctAnswer; }
                
            }
        }

    }
    while(value1 % value2);
    
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

let fillLifebar = function(){

    if(!lifebarExist){ lifebarExist = buildLifebar();}

    let lifeArray = document.getElementsByClassName("life-empty");
    
    for(let j = 0; j < player.lives; j++){
       
        lifeArray[j].classList.add("life");
        //lifeArray[0].classList.add("life");

    }

}

let reduceLife = function(){

    player.lives--;

    let lifeArray = document.getElementsByClassName("life-empty");
    lifeArray[player.lives].classList.remove("life");

    if(player.lives > 0){
        
        makeQuestionary();
    }   
    else{ 
        setTimeout(makeResults, 200);
    }

}

let buildLifebar = function(){

    let lifebar = document.getElementById("lifebar-area");
    let lifeEmpty;
    
    for(let i = 0; i < maxLives; i++){
    
        lifeEmpty = document.createElement("div");
        lifeEmpty.className = "life-empty";

        lifebar.appendChild(lifeEmpty);
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
    let repeatCount = 0;
    let value1, value2;

    for(let i = 0; i < optionsAmount; i++){
        
        repeatCount++;

        if(repeatCount > 5 * optionsAmount){
            
            window.location.href = "error.html";
        } // Will quit the game in case of too many loops.

        value1 = getValue(salt);
        value2 = getValue(salt);

        answerOptions[i] = calc(value1, value2);
        
        if(answerOptions[i] == correctAnswer){
            i--;
        }
        /*
        else{

            for(let j = 0; j < i; j++){
                
                if(answerOptions[j] == answerOptions[i]){
                    i--;
                }
                
            }
        }
        */
            
    } 

    answerOptions[Math.floor(Math.random() * optionsAmount)] = correctAnswer;
    
    for(let i = 0; i < optionsAmount; i++){

    }

    return answerOptions;

}

let verify = function(value){
    
    clearInterval(intervalId);
    player.questionAmount++;
    
    if(value == correctAnswer){
        
        setStatus(true);
        difficulty++;
        player.correctQuestions++;
        increaseScore();

        if(!(player.correctQuestions % 8) && pausas < 10){ pausas++; }
        if(!(player.correctQuestions % 10) && player.lives < 10){ player.lives++; }
        if(difficulty > 10){ timeValue /= 1.04;}

        setTimeout(makeQuestionary, 500);   
    }
    else{

        setStatus(false);
        if(difficulty > 5){difficulty--;}
        if(player.lives < 6){ timeValue *= 1.5; }

        setTimeout(reduceLife, 500);
        
    }

}

let setStatus = function(status){

    let answerStatus = document.getElementById("answer-status");

    fadeInElement(answerStatus);
    if(status){

        answerStatus.style.color = "var(--highlight-positive)";
        answerStatus.innerText = 'Correto';
        
    }
    else{
        
        answerStatus.style.color = "var(--highlight-negative)";
        answerStatus.innerText = 'Errado!';
        
    }
    setTimeout(function(){fadeOutElement(answerStatus)}, 1000);

}

let increaseScore = function(){

    let score = Math.floor((difficulty / 10)) + 2;
    player.score += score;

    let scoreEarnedArea = document.getElementById("score-earned"); 
    scoreEarnedArea.innerText = '+' + score;
    fadeInElement(scoreEarnedArea);

    setTimeout(function(){fadeOutElement(scoreEarnedArea)}, 500);
}

let fadeOutElement = function(DOMElement){

    DOMElement.style.transition = "all 1s";
    DOMElement.style.opacity = 0;

}
let fadeInElement = function(DOMElement){

    DOMElement.style.transition = "all .08s";
    DOMElement.style.opacity = 1;

}

let displayScore = function(){

    let pausa = document.getElementById("pausa");
    pausa.innerHTML = pausas + "x <strong>P</strong>";
    if(pausas > 0){ pausa.disabled = false; }

    let score = document.getElementById("score");
    score.innerText = player.score;
    
    let level = document.getElementById("level");
    level.innerText = player.questionAmount;

}

let startTimer = function(){

    timebarWidth = 100;
    clearInterval(intervalId);
    intervalId = setInterval(countDown, timeValue);
}

let pauseTimer = function(){

    document.getElementById("pausa").setAttribute("disabled", "true");
    clearInterval(intervalId);
    pausas--;

}

let countDown = function(){      
    if(timebarWidth < 1){

        clearInterval(intervalId);
        reduceLife();
        
    }
    else{

        timebarWidth--;
        timebar.style.width = timebarWidth + "%";
    }

}

let makeQuestionary = function(){

    if(player.lives > 0){

        displayScore();
        fillLifebar();
        startTimer();

        switch(operation){
            case 'addition': addition(); break;
            case 'subtraction':  subtraction(); break;
            case 'multiplication': multiplication(); break;          
            case 'division': division(); break;
        }
        
    }

    //go to results.
}

let makeResults = function(){

    let transfer = JSON.stringify(player);
    sessionStorage.setItem("player", transfer);
    window.location.href = "results.html";

}

switch(operation){

    case 'addition':
        title = "Adição"; 
        player.mode = "Adição";
        operationSymbol = '+';
        //addition();
        break;
        
    case 'subtraction':
        title = "Subtração";
        player.mode = "Subtração";
        operationSymbol = '-';
        break;
        
    case 'multiplication':
        title = "Multiplicação";    
        player.mode = "Multiplicação";
        operationSymbol = 'x';
        
        break;
        
    case 'division':
        title = "Divisão";    
        player.mode = "Divisão";
        operationSymbol = '÷';
    break;
}

makeQuestionary();
document.title += " " + title;
document.getElementById("title-operation").innerText = title;
document.getElementById("operation-symbol").innerText = operationSymbol;
