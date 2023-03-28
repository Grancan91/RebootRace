//player.start
//Keyboard EventListener -> Call -> whatWant(Event)
import { player, rivalCar } from "./car.js";

//import Player from "./car.js"
// import Game from "./game.js";

//Elementos traídos del DOM
const insertCoin = document.querySelector(".start_button"); //Botón del START
const gameOverScreen = document.querySelector(".over") // Pantalla del GAME OVER


startGame()

window.addEventListener("keydown", function (e) { whatWant(e)});
// var insertCoin = document.querySelector(".start_button");

function inicio() {
    // var insertCoin = document.querySelector(".start_button");
    insertCoin.addEventListener(("click"), function (e) {
        //insertCoin.setAttribute("class", "off")
        insertCoin.classList.add('off')
        rivalCar.newRival(rivalCar)
    })
}

function startGame(){
    inicio();
    //rivalCar.newRival(rivalCar)
}

function gameOver(){
    gameOverScreen.classList.remove("off"); 
    insertCoin.classList.remove("off")  

    
}
function restartGame(){
    inicio()
    gameOverScreen.classList.add("off"); 
    



}
function randomRivals(){

}
function gameProgres(){
    
}
function whatWant(e){
    //Player posX - posY Movement
        switch (e.key) {
            case "ArrowLeft":
                if ((player.posX + player.width) > 110) { //Left Border Map
                    player.posX -= player.speedX;
                    // LLama funcion que actualiza la imagen en el ejeX del player.
                    player.newPos(player)
                }
                break;
            case "ArrowRight":
                if ((player.posX + player.width) < 950) { //Right Border Map
                    player.posX += player.speedX;
                    //LLama funcion que actualiza la imagen en el ejeX del player.
                    player.newPos(player)

                }
                break;
            case "ArrowUp":
                if ((player.posY + player.height) > 150) { //Right Border Map
                    player.posY -= player.speedY;
                    //LLama funcion que actualiza la imagen en el ejeX del player.
                    player.newPos(player)

                }
                break;
            case "ArrowDown":
                if ((player.posY + player.height) < 690) { //Right Border Map
                    player.posY += player.speedY;
                    //console.log(player.posY)
                    //LLama funcion que actualiza la imagen en el ejeX del player.
                    player.newPos(player)

                }
                break;
        }

        if (player.checkCollisionPlayer()){
            // PIERDES UNA VIDA
            /* if (lives === 0){
            GAME OVER
            } */
            
        }

        console.log(`Rival-PosY: ${rivalCar.posY}/ Rival-PosX: ${rivalCar.posX}`)
        console.log(`Rival-PosY: ${player.posY}/ Rival-PosX: ${player.posX}`)


}

export default gameOver;











//player.newPosX