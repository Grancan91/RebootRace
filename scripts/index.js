import { player, rivalCar, arrCar } from "./car.js";

//Elements of sounds 
const musicGame = new Audio("./sounds/musicGame.mp3");
musicGame.volume = 0.2;
const efectSound = "";
const crash = new Audio("./sounds/crash.mp3");
crash.volume = 0.3;
const gameOverMusic = new Audio("./sounds/failure.mp3");
gameOverMusic.volume = 0.3;


//Elements from the DOM
const insertCoin = document.querySelector(".start_button"); //START Button
const gameOverScreen = document.querySelector(".over") // GAME OVER Screen
const restartBtn = document.querySelector(".restart-button") // Restart Button
const deloreangif = document.querySelector(".deloreangif") // Restart Button
const playerdom = document.querySelector('.player1');
const backgroundtrans = document.querySelector(".fondo"); //Background


//EventListener of Start Game
insertCoin.addEventListener(("click"), function (e) {
    insertCoin.classList.add('off')
    deloreangif.classList.add('off')
    musicGame.play()
    
    player.startScore()
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
        deloreangif.classList.remove('off')
        playerdom.classList.add('off')
         
        }, 900);

    setTimeout(function(){
        gameOverMusic.play()
    }, 1800)

    console.log(player.score)

    player.stopScore()
    player.posX = 500;
    player.posY = 600;
    player.newPos(player)
    rivalCar.delRival()
}

restartBtn.addEventListener(("click"), restartGame); //Restart Game's eventListener

function restartGame(){
    
    musicGame.play()
    
    let id = 1;
    arrCar.forEach((rival) => {
        rival.newRival(id)
        id++
    });
    player.startScore()
   


    deloreangif.classList.add('off')
    gameOverScreen.classList.add("off");     
    playerdom.classList.remove('off')

}

function whatWant(e){

    //Player movement in posX and posY 
    switch (e.key) {
        case "ArrowLeft":
            if ((player.posX + player.width) > 160) { //Left Border Map's Limit
            
                player.posX -= player.speedX; 
                player.newPos(player) //Actualiza las posiciones en el objeto player.
               // player.checkCollisionPlayer()       
            }
            break;
            
        case "ArrowRight":
            if ((player.posX + player.width) < 800) { //Right Border Map

                player.posX += player.speedX;
                player.newPos(player)
                player.checkCollisionPlayer()
            }
            break;

        case "ArrowUp":
            if ((player.posY + player.height) > 250) { //Top Border Map

                player.posY -= player.speedY;
                player.newPos(player)
                player.checkCollisionPlayer()
            }
            break;

        case "ArrowDown":
            if ((player.posY + player.height) < 650) { //Botton Border Map

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