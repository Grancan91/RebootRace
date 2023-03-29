import { player, rivalCar, arrCar } from "./car.js";

//Elementos traídos del DOM
const insertCoin = document.querySelector(".start_button"); //Botón del START
const gameOverScreen = document.querySelector(".over") // Pantalla del GAME OVER
const restartBtn = document.querySelector(".restart-button") // Restart Button



// var insertCoin = document.querySelector(".start_button");    
insertCoin.addEventListener(("click"), function (e) {
    insertCoin.classList.add('off')
    let id = 1;
    arrCar.forEach((rival) => {            
        rival.newRival(id)
        id++
    });
})

    window.addEventListener("keydown", function (e) { whatWant(e) });


function gameOver(){
   
    setTimeout(function(){
        gameOverScreen.classList.remove("off");
    }, 900);
/*     arrCar.forEach((rival) => {
        rival.posX = Math.random() * 800
        rival.posY = Math.random() * (-800)
    }); */
    player.posX = 400
    player.posY = 700
    
   rivalCar.delRival();
    
}

restartBtn.addEventListener(("click"), function (e) { restartGame() });

function restartGame(){
    
    gameOverScreen.classList.add("off"); 
    insertCoin.classList.remove("off");
    
     
    
    
}

function whatWant(e){
    //Player posX - posY Movement
        switch (e.key) {
            case "ArrowLeft":
                if ((player.posX + player.width) > 160) { //Left Border Map
                    player.posX -= player.speedX;
                    
                    // LLama funcion que actualiza la imagen en el ejeX del player.
                    player.newPos(player)
                    player.checkCollisionPlayer()  
                    
                }
                break;
            case "ArrowRight":
                if ((player.posX + player.width) < 950) { //Right Border Map
                    player.posX += player.speedX;
                    //LLama funcion que actualiza la imagen en el ejeX del player.
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
                if ((player.posY + player.height) < 800) { //Right Border Map
                    player.posY += player.speedY;
                   
                    player.newPos(player)                    
                    player.checkCollisionPlayer()

                }
                break;
        }       

}

export default gameOver;











