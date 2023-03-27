//Prototipo

function Cars(vida,posX,posY,speedX,speedY,width,height){
    this.vida = vida
    this.posX = posX
    this.posY = posY
    this.speedX = speedX
    this.speedY = speedY
    this.width = width
    this.height = height
}

// Coche del Jugador
function Player(score, Vida, posX, posY, speedX, speedY, width, height){
    Cars.call(this, Vida, posX, posY, speedX, speedY, width, height)
    this.score = 0
}
Player.prototype = Object.create(Cars.prototype)
Player.prototype.constructor = Player

//New player with Start parameters.
var player = new Player(
    0,      //score
    3,      //vida
    300,    //posX
    500,      //posY
    80,     //speedX
    100,    //sppedY
    100,    //width
    150     //Heigth
)
var rivalCar  = new Cars(
    3,      //vida
    300,    //posX
    20,      //posY
    80,     //speedX
    10,    //speedY
    100,    //width
    150     //Heigth
    )

//Recive un ObjPlayer con la nueva posX -> Injecta en DOM
Player.prototype.newPos = function (player){
    var playerCar = document.querySelector('.player1');
    playerCar.style.left = `${player.posX}px`;
    playerCar.style.top = `${player.posY}px`;
    console.log("P1-X: " + player.posX)
}

var rivalIntervalID
var screen = document.querySelector('.screen_game_mid')
Cars.prototype.newRival = function(){
    //Mostrar en HTML
    const createRival = document.createElement('div')
    createRival.style.left = rivalCar.posX + "px"
    createRival.setAttribute('class','rival')
    screen.appendChild(createRival)
    //var interval  = Math.floor(Math.random()*10)
    //Moivmiento Vertical del
    rivalIntervalID = setInterval(rivalCar.rivalMove,300)
}

//Move rival -> Y lo elimina al final.


/***********BUG EN COCHE RIVAL SI NO SE INICIALIZA EL PLAYER (APROX 360px) **********/

Cars.prototype.rivalMove = function (){
    var rivalDOM = document.querySelector('.rival');
    rivalCar.posY += rivalCar.speedY;


// Condictional for rival's progress until screen's final
    if (rivalCar.posY < 800){
        rivalCar.posY += rivalCar.speedY;

        // Condicional check the Collision against the player

        if (rivalCar.checkCollisionRival()) {
            //console.log("If - checkColision")
            //Eliminar Rival/Parar Timer
            //clearInterval(rivalIntervalID)
            //screen.removeChild(rivalDOM)
        } else {
        rivalDOM.style.top = `${rivalCar.posY}px`
        }



    
    }else{
    //Eliminar Rival/Parar Timer
        clearInterval(rivalIntervalID)
        screen.removeChild(rivalDOM)
    }
   


}

Cars.prototype.checkCollisionRival = function () {
   /* var rivalLeftTop = rivalCar.posY;
    var rivalLeftBottom = rivalCar.posY + rivalCar.height;
    var rivalRigthTop = rivalCar.posX + rivalCar.width;
    var rivalRigthBottom = rivalLeftBottom + rivalCar.width; */
  
    /* SOLO NECESITAMOS LAS DOS ÚLTIMAS PARA EL RIVALCAR

    //Collision Top Left
    if( player.posY <= rivalCar.posY + rivalCar.height &&
        player.posY >= rivalCar.posY &&
        player.posX >= rivalCar.posX &&
        player.posX <= rivalCar.posX + rivalCar.width){
        console.log("Colisión Top Left")
        }
    
    // Collision Top Right
    if( player.posY <= rivalCar.posY + rivalCar.height &&
        player.posY + player.height >= rivalCar.posY &&
        player.posX + player.width >= rivalCar.posX &&
        player.posX <= rivalCar.posX + rivalCar.width){
        console.log("Colisión Top Right")
        } 
     */
    
    // Collision Bottom Left
    if (rivalCar.posY <= player.posY + player.height &&
        rivalCar.posY + rivalCar.height >= player.posY &&
        rivalCar.posX <= player.posX + player.width &&
        rivalCar.posX + rivalCar.width >= player.posX){
        console.log("Colisión Bottom Rigth")
        clearInterval(rivalIntervalID)
        } 
    
    // Collision Bottom Rigth
    if (rivalCar.posY <= player.posY &&
        rivalCar.posY + rivalCar.height >= player.posY &&
        rivalCar.posX <= player.posX + player.width &&
        rivalCar.posX + rivalCar.width > player.posX){
            console.log("Colisión Bottom Left")
        clearInterval(rivalIntervalID)
        }
    

    
    
    






    /*
    console.log(`Player X: ${player.posX} Y: ${player.posY}`)
    console.log(`Rival X: ${rivalCar.posX} Y: ${rivalCar.posY + rivalCar.height}`)

    if (rivalLeftBottom > player.posY ){
        
        console.log(`bucle 1 - Colisión -Left Top ${rivalLeftTop} // Rigth Top ${rivalRigthTop} //LeftBottom: ${rivalLeftBottom} // RigthBottom: ${rivalRigthBottom}`)
        if (rivalLeftBottom > player.posX) { 
            console.log("bucle 2 - Colisión")
            if (rivalRigthTop > player.posX) {
                console.log("bucle 3")
                if (rivalRigthBottom > player.posX || rivalLeftBottom < player.posX + player.width){
                    console.log("done")

                }
            }
        // Si la esquina superior del player es menor que la esquina Rigth Top del Rival
        }         
    } else {
        console.log("Vía libre")

    }
       

        
*/

   
   
}
 

Cars.prototype.checkCollisionPlayer = function (){
     //Collision Top Left
    if( player.posY <= rivalCar.posY + rivalCar.height &&
        player.posY >= rivalCar.posY &&
        player.posX >= rivalCar.posX &&
        player.posX <= rivalCar.posX + rivalCar.width){
        console.log("Colisión Top Left")
        }
    
    // Collision Top Right
    if( player.posY <= rivalCar.posY + rivalCar.height &&
        player.posY + player.height >= rivalCar.posY &&
        player.posX + player.width >= rivalCar.posX &&
        player.posX <= rivalCar.posX + rivalCar.width){
        console.log("Colisión Top Right")
        } 
    
    // Collision Bottom Left
    if(player.posY <= rivalCar.posY + rivalCar.height &&
        player.posY + player.height >= rivalCar.posY &&
        player.posX <= rivalCar.posX + rivalCar.width &&
        player.posX + player.width >= rivalCar.posX){
        console.log("Colisión Bottom Rigth")
        } 
    
    // Collision Bottom Rigth
    if(player.posY <= rivalCar.posY &&
        player.posY + player.height >= rivalCar.posY &&
        player.posX <= rivalCar.posX + rivalCar.width &&
        player.posX + player.width > rivalCar.posX){
            console.log("Colisión Bottom Left")
        }
    



/*
    if (player.posX < rivalCar.posX + rivalCar.width &&
        player.posY < rivalCar.posY + rivalCar.height &&
        player.posX + rivalCar.width > rivalCar.posX &&
        player.posY + rivalCar.height > rivalCar.posY) {

        console.log("Colisión")

        // else if para player 
    } else if (player.posY < rivalCar.posY + rivalCar.height &&
        player.posX < rivalCar.posX + rivalCar.width &&
        player.posX + player.height > rivalCar.posY &&
        player.posY + rivalCar.width > rivalCar.posX) {

        console.log("Colisión")


    } else {
        console.log("No Colisión")


    }



} */

    /* if (player.posY > rivalCar.posY 
        && (rivalCar.posY + rivalCar.height) > player.posY
        && player.posX < (rivalCar.posX + rivalCar.width)
        && (rivalCar.posX + rivalCar.width) > player.posX){
   
        console.log("Colisión")
        

    } else {
        */

}
    


export {
    player,
    rivalCar
} 



//Papelera
/*
//Unir Eje X e eje y en 1
Player.prototype.newPosY = function (player){
    var playerCarY = document.querySelector('.player1');
   // playerCarY.setAttribute('style', `top:${player.posY}px`)
    
}
*/