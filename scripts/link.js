let operation = sessionStorage.getItem("gameMode");
let operationSymbol = '';
let title = "";

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

    let salt = Math.pow(10, (difficulty / 3) + 1) / 3;
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
        else{

            for(let j = 0; j < i; j++){
                
                if(answerOptions[j] == answerOptions[i]){
                    i--;
                }
                
            }
        }
            
    } 

    answerOptions[Math.floor(Math.random() * optionsAmount)] = correctAnswer;
    
    for(let i = 0; i < optionsAmount; i++){

    }

    return answerOptions;

}

let verify = function(value){
    
    player.questionAmount++;

    if(value == correctAnswer){
        
        difficulty++;
        player.correctQuestions++;
        player.score = 20 * player.correctQuestions + 1;

        if(!(player.correctQuestions % 8) && pausas < 10){ pausas++; }
        if(!(player.correctQuestions % 10) && player.lives < 10){ player.lives++; }
        if(difficulty > 10){ timeValue /= 1.2;}

        makeQuestionary();
    }
    else{

        if(difficulty > 1){difficulty--;}
        if(player.lives < 6){ timeValue *= 1.5; }

        reduceLife();
        
    }

}

let displayScore = function(){

    let pausa = document.getElementById("pausa");
    pausa.innerHTML = pausas + "x ⏸️";
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
            case 'subtraction':  addition(); break;
            case 'multiplication': addition(); break;          
            case 'division': addition(); break;
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
