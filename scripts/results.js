let finalRating;
let transfer = sessionStorage.getItem("player");
let player = JSON.parse(transfer);

let setValues = function(){
    
    if(player.score < 25){ finalRating = '★'}
    else if(player.score < 50){ finalRating = '★★'}
    else if(player.score < 100){ finalRating = '★★★'}
    else if(player.score < 200){ finalRating = '★★★★'}    
    else if(player.score < 500){ finalRating = '★★★★★'}
    else if(player.score < 1000){ finalRating = '!'}
    else if(player.score < 10000){ finalRating = '!!'}
    else{ finalRating = '☠️'}
    

}

setValues();
document.getElementById("rating").innerText = finalRating;
document.getElementById("mode").innerText = player.mode;
document.getElementById("correct-answers").innerText = player.correctQuestions;
document.getElementById("total-answers").innerText = player.questionAmount;
document.getElementById("final-score").innerText = player.score ;
sessionStorage.clear();

