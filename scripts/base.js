let loadGame = function(operation){

    sessionStorage.setItem("gameMode", operation);
    window.location.href = "game.html";


}