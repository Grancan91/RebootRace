//player.start
//Keyboard EventListener -> Call -> whatWant(Event)

window.addEventListener("keydown", function (e) { whatWant(e)});

function startGame(){

}
function gameOver(){

}
function restartGame(){

}
function randomRivals(){

}
function gameProgres(){
    
}

function whatWant(e){
    console.log(`Key press: ${e.key}, P.posX:${player.posX} P.posY:${player.posY}`)
    //Player posX Movement
    switch(e.key){
    case "ArrowLeft":
            if ((player.posX + player.size) > 100) { //Left Border Map
            player.posX -= player.speedX;
            //LLama funcion que actualiza la imagen en el ejeX del player.
            player.newPosX(player)
        }
        break;  
    case "ArrowRight":
            if ((player.posX + player.size) < 950) { //Right Border Map
            player.posX += player.speedX;
            //LLama funcion que actualiza la imagen en el ejeX del player.
            player.newPosX(player)
        }
        break; 
    case "ArrowUp":
            if ((player.posY + player.size)) { //Right Border Map
            player.posY -= player.speedY;
            //LLama funcion que actualiza la imagen en el ejeX del player.
            player.newPosY(player)
        }
        break;
        case "ArrowDown":
            if ((player.posY + player.size)) { //Right Border Map
            player.posY += player.speedY;
            console.log(player.posY)
            //LLama funcion que actualiza la imagen en el ejeX del player.
            player.newPosY(player)
        }
        break;
    }
}
