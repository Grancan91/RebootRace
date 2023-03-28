import gameOver from "./index.js"

//Prototipo

function Cars(vida,posX,posY,speedX,speedY,width,height,spriteId){
    this.vida = vida
    this.posX = posX
    this.posY = posY
    this.speedX = speedX
    this.speedY = speedY
    this.width = width
    this.height = height
    this.spriteId = spriteId
    this.dom
    this.timer

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
    3,    //speedY
    100,    //width
    150,     //Heigth
    1       //id
    )

var rivalCar1 = new Cars(
    3,      //vida
    600,    //posX
    -100,      //posY
    80,     //speedX
    4,    //speedY
    100,    //width
    150,     //Heigth
    2       //id
)

var rivalCar2 = new Cars(
    3,      //vida
    750,    //posX
    -300,      //posY
    80,     //speedX
    7,    //speedY
    100,    //width
    150,     //Heigth
    3       //id
)

var arrCar = [rivalCar, rivalCar1, rivalCar2];

//Recive un ObjPlayer con la nueva posX -> Injecta en DOM
Player.prototype.newPos = function (player){
    var playerCar = document.querySelector('.player1');
    playerCar.style.left = `${player.posX}px`;
        playerCar.style.top = `${player.posY}px`;
        console.log("P1-X: " + player.posX)
}

var rivalIntervalID
var screen = document.querySelector('.screen_game_mid')

let speed = 300; // rapidez

Cars.prototype.newRival = function(id){   

    
    //Mostrar en HTML
    this.dom = document.createElement('div')
    this.dom.style.left = this.posX + "px"
    this.dom.style.top = this.posY + "px"
    this.dom.setAttribute('class','rival')    
    this.dom.setAttribute('id', this.spriteId)
    screen.appendChild(this.dom)
    //var interval  = Math.floor(Math.random()*10)
    //Moivmiento Vertical delGAME OVER
    this.timer = setInterval(this.rivalMove, speed) 
}

/***********BUG EN COCHE RIVAL SI NO SE INICIALIZA EL PLAYER (APROX 360px) **********/

Cars.prototype.rivalMove = function (){
    
    arrCar.forEach(i => {
        console.log(i.posY)
        //arrCar[i].dom
    
       // var rivalDOM = document.querySelector('.rival');
        i.posY += i.speedY;
    
    // Condictional for rival's progress until screen's final
        if (i.posY < 1000){
            i.posY += i.speedY;
    
            // Condicional check the Collision against the player
    
            if (i.checkCollisionRival()) {
                //console.log("If - checkColision")
                //Eliminar Rival/Parar Timer
                //clearInterval(rivalIntervalID)
                //screen.removeChild(rivalDOM)
            } else {
            i.dom.style.top = `${i.posY}px`
            }
        
        }else{
        //Eliminar Rival/Parar Timer
          
           i.posY = -200
           //
            //screen.removeChild(i.dom)}


            // *********** POSIBILIDAD DE AÑADIR Math.floor(Math.random()* 950) *********
            


        }
       
        
    });


}

Cars.prototype.checkCollisionRival = function () {
   /* var rivalLeftTop = rivalCar.posY;
    var rivalLeftBottom = rivalCar.posY + rivalCar.height;
    var rivalRigthTop = rivalCar.posX + rivalCar.width;
    var rivalRigthBottom = rivalLeftBottom + rivalCar.width; */

    /* SOLO NECESITAMOS LAS DOS ÚLTIMAS PARA EL RIVALCAR
}
        console.log("Colisión Top Right")
        } 
     */
    
   

   for(let i=0;i< arrCar.length;i++){

  // Collision Bottom Left
    if (arrCar[i].posY <= player.posY + player.height &&
        arrCar[i].posY + arrCar[i].height >= player.posY &&
        arrCar[i].posX <= player.posX + player.width &&
        arrCar[i].posX + arrCar[i].width >= player.posX){
        console.log("Colisión Bottom Rigth")
        if(player.life < 1){

        //player.life --;
        gameOver()
        clearInterval(this.timer)
        }
        } 
    
    // Collision Bottom Rigth
    if (arrCar[i].posY <= player.posY &&
        arrCar[i].posY + arrCar[i].height >= player.posY &&
        arrCar[i].posX <= player.posX + player.width &&
        arrCar[i].posX + arrCar[i].width > player.posX){
            console.log("Colisión Bottom Left")
            gameOver()
        //clearInterval(this.timer)
        }
    
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

    for(let i = 0; i < arrCar.length; i++){

   
     //Collision Top Left
    if( player.posY <= arrCar[i].posY + arrCar[i].height &&
        player.posY >= arrCar[i].posY &&
        player.posX >= arrCar[i].posX &&
        player.posX <= arrCar[i].posX + arrCar[i].width){
            gameOver()
        }
    
    // Collision Top Right
    if( player.posY <= arrCar[i].posY + arrCar[i].height &&
        player.posY + player.height >= arrCar[i].posY &&
        player.posX + player.width >= arrCar[i].posX &&
        player.posX <= arrCar[i].posX + arrCar[i].width){

            gameOver()
        } 
    
    // Collision Bottom Left
    if(player.posY <= arrCar[i].posY + arrCar[i].height &&
        player.posY + player.height >= arrCar[i].posY &&
        player.posX <= arrCar[i].posX + arrCar[i].width &&
        player.posX + player.width >= arrCar[i].posX){

            gameOver()
        } 
    
    // Collision Bottom Rigth
    if(player.posY <= arrCar[i].posY &&
        player.posY + player.height >= arrCar[i].posY &&
        player.posX <= arrCar[i].posX + arrCar[i].width &&
        player.posX + player.width > arrCar[i].posX){

            gameOver()
        
        }
    
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
    rivalCar,
    arrCar
} 



//Papelera
/*
//Unir Eje X e eje y en 1
Player.prototype.newPosY = function (player){
    var playerCarY = document.querySelector('.player1');
   // playerCarY.setAttribute('style', `top:${player.posY}px`)
    
}
*/