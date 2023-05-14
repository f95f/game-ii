let finalRating;
let player = sessionStorage.getItem("player");

let setValues = function(){
    
    if(player.score < 25){ finalRating = '*'}
    else if(player.score < 50){ finalRating = '**'}
    else if(player.score < 100){ finalRating = '***'}
    else if(player.score < 200){ finalRating = '****'}    
    else if(player.score < 500){ finalRating = '*****'}
    else if(player.score < 1000){ finalRating = '!'}
    else if(player.score < 10000){ finalRating = '!!'}
    else{ finalRating = '☠️'}
    

}

setValues();
alert(finalRating);
sessionStorage.clear();