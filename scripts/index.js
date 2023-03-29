import { player, rivalCar, arrCar } from "./car.js";

//Elements of sounds 
const musicGame = new Audio("./sounds/musicGame.mp3");
const efectSound = "";
const crash= new Audio("./sounds/crash.mp3");
const gameOverMusic = new Audio("./sounds/failure.mp3");

//Elements from the DOM
const insertCoin = document.querySelector(".start_button"); //START Button
const gameOverScreen = document.querySelector(".over") // GAME OVER Screen
const restartBtn = document.querySelector(".restart-button") // Restart Button

//EventListener of Start Game
insertCoin.addEventListener(("click"), function (e) {
    insertCoin.classList.add('off')
    musicGame.play()
    let id = 1;
    arrCar.forEach((rival) => {  
        rival.newRival(id)
        id++
    });
})

window.addEventListener("keydown", whatWant); //Keyboard's EventListener

function gameOver(){
    musicGame.pause()
    crash.play()
    setTimeout(function(){
        gameOverScreen.classList.remove("off");
    }, 900);

    setTimeout(function(){
        gameOverMusic.play()
    }, 1800)
  
    player.posX = 400
    player.posY = 700
    player.newPos(player)

    rivalCar.delRival();
}

restartBtn.addEventListener(("click"), restartGame); //Restart Game's eventListener

function restartGame(){
    gameOverScreen.classList.add("off"); 
    insertCoin.classList.remove("off");  
}

function whatWant(e){

    //Player movement in posX and posY 
    switch (e.key) {
        case "ArrowLeft":
            if ((player.posX + player.width) > 160) { //Left Border Map's Limit
               
                player.posX -= player.speedX; 
                player.newPos(player)
                player.checkCollisionPlayer()       
            }
            break;
            
        case "ArrowRight":
            if ((player.posX + player.width) < 950) { //Right Border Map

                player.posX += player.speedX;
                player.newPos(player)
                player.checkCollisionPlayer()
            }
            break;

        case "ArrowUp":
            if ((player.posY + player.height) > 150) { //Right Border Map

                player.posY -= player.speedY;
                player.newPos(player)
                player.checkCollisionPlayer()
            }
            break;

        case "ArrowDown":
            if ((player.posY + player.height) < 750) { //Right Border Map

                player.posY += player.speedY;
                player.newPos(player)                    
                player.checkCollisionPlayer()
            }
            break;
    }    
}



export {
    gameOver, 
    crash
} 