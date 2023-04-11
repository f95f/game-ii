
let operation = sessionStorage.getItem("gameMode");
let title = "";

switch(operation){

    case 'addition':
        title = "Adição";    
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