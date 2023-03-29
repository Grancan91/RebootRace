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
    400,    //posX
    700,      //posY
    80,     //speedX
    100,    //sppedY
    100,    //width
    150     //Heigth
)

var rivalCar  = new Cars(
    3,      //vida
    300,    //posX
    -300,      //posY
    80,     //speedX
    3,    //speedY
    100,    //width
    150,     //Heigth
    1       //id
    )

var rivalCar1 = new Cars(
    3,      //vida
    600,    //posX
    -300,      //posY
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

let speed = 150; // rapidez

Cars.prototype.newRival = function(id){   

    //Mostrar en HTML
    this.dom = document.createElement('div')
    this.dom.style.left = this.posX + "px"
    this.dom.style.top = this.posY + "px"
    this.dom.setAttribute('class','rival')    
    this.dom.setAttribute('id', this.spriteId)
    screen.appendChild(this.dom)
   
    //Moivmiento Vertical delGAME OVER
    this.timer = setInterval(this.rivalMove, speed) 
}

Cars.prototype.delRival = function () {

   // var arrCar2 = document.getElementsByClassName("rival")

    arrCar.forEach(element => {
        
        console.log(element.dom)
        screen.removeChild(element.dom)
        clearInterval(element.timer)
 
        /* 
       var nrandom = Math.floor(Math.random() * (5))       
        switch (nrandom) {
            case 1:
                element.posX = 200;                
                break;
            case 2:
                element.posX = 400;
                break;
            case 3:
                element.posX = 600;
                element.posY 
                break;
            case 4:
                element.posX = 800;
                break;        
        }  
         */

       element.posY = -300
       
      
    });
    
}

/***********BUG EN COCHE RIVAL SI NO SE INICIALIZA EL PLAYER (APROX 360px) **********/

Cars.prototype.rivalMove = function (){
    
    arrCar.forEach(i => {
    
        i.posY += i.speedY;
       
           
    // Condictional for rival's progress until screen's final
        if (i.posY < 1000){
            i.posY += i.speedY;
    
            // Condicional check the Collision against the player
            if (i.checkCollisionRival()) {
                gameOver()
                i.dom.style.top = `${i.posY}px`
                i.dom.style.left = `${i.posX}px`
                
            } else {
                i.dom.style.top = `${i.posY}px`
                i.dom.style.left = `${i.posX}px`
            }
        
        }else{
        //Eliminar Rival/Parar Timer
        console.log("llegue abajo"+ i)
        i.posY = -250        
          
         switch (Math.floor(Math.random() * 5)) {
            case 1:
                i.posX = 200;
         
                break;
            case 2:
                i.posX = 400;
         
                break;
            case 3:
                i.posX = 600;
                break;
            case 4:
                i.posX = 800;
                break;

        }  
 
   
        }
       
    });

}


Cars.prototype.checkCollisionRival = function () {


   for(let i=0;i< arrCar.length;i++){

  // Collision Bottom Left
    if (arrCar[i].posY <= player.posY + player.height &&
        arrCar[i].posY + arrCar[i].height >= player.posY &&
        arrCar[i].posX <= player.posX + player.width &&
        arrCar[i].posX + arrCar[i].width >= player.posX){
        console.log("Colisión Bottom Rigth")
    
        gameOver()
        clearInterval(this.timer)
    } 
    
    // Collision Bottom Rigth
    if (arrCar[i].posY <= player.posY &&
        arrCar[i].posY + arrCar[i].height >= player.posY &&
        arrCar[i].posX <= player.posX + player.width &&
        arrCar[i].posX + arrCar[i].width > player.posX){
            console.log("Colisión Bottom Left")
        gameOver()
        clearInterval(this.timer)
    }
    
   } 
   
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

}
    


export {    
    player,
    rivalCar,
    arrCar
} 

