import { gameOver, crash} from "./index.js"

//Prototype
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

// Player's Car
function Player(score, Vida, posX, posY, speedX, speedY, width, height){
    Cars.call(this, Vida, posX, posY, speedX, speedY, width, height)
    this.score = 0
}
Player.prototype = Object.create(Cars.prototype)
Player.prototype.constructor = Player

//New player with Start's parameters.
var player = new Player(
    0,      //score
    3,      //vida
    400,    //posX
    700,      //posY
    15,     //speedX
    15,    //sppedY
    80,    //width
    130     //Heigth
    )

var rivalCar  = new Cars(
    3,      //vida
    300,    //posX
    -300,      //posY
    80,     //speedX
    2,    //speedY
    80,    //width
    130,     //Heigth
    1       //id
    )

var rivalCar1 = new Cars(3, 600, -300, 80, 4, 80, 130, 2)

var rivalCar2 = new Cars(3, 750, -300, 80, 6, 80, 130, 3)

var rivalCar3 = new Cars(3, 750, -300, 80, 2, 80, 130, 3)

var rivalCar4 = new Cars(3, 750, -300, 80, 1, 80, 130, 3)

var arrCar = [rivalCar, rivalCar1, rivalCar2, rivalCar3, rivalCar4];


//Recive a ObjPlayer with the new posX -> Inject in DOM
Player.prototype.newPos = function (player){
    var playerCar = document.querySelector('.player1');
    playerCar.style.left = `${player.posX}px`;
        playerCar.style.top = `${player.posY}px`;
        console.log("P1-X: " + player.posX)
}

var rivalIntervalID
var screen = document.querySelector('.screen_game_mid')

let speed = 150; // Rival's speed

Cars.prototype.newRival = function(id){   

    //Show in HTML
    this.dom = document.createElement('div')
    this.dom.style.left = this.posX + "px"
    this.dom.style.top = this.posY + "px"
    this.dom.setAttribute('class','rival')    
    this.dom.setAttribute('id', this.spriteId)
    screen.appendChild(this.dom)
   
    //Movement in axis Y of Rivals
    this.timer = setInterval(this.rivalMove, speed) 
}

Cars.prototype.delRival = function () {

    arrCar.forEach(element => {
       screen.removeChild(element.dom)
       clearInterval(element.timer)
       element.posY = -300
    });
}

var anterior = 1
var random
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

        //Remove Rival/Stop Timer
        player.score += 100;
        i.posY = -250; 

        //Generate new respawn of rivals
        random = Math.ceil(Math.random() * 6)
            if(random != anterior){      
                switch (random) {
                    case 1:
                        i.posX = 20;
                        break;
                    case 2:
                        i.posX = 140;
                        break;
                    case 3:
                        i.posX = 260;
                        break;
                    case 4:
                        i.posX = 380;
                        break;
                    case 5:
                        i.posX = 500;
                        break;
                    case 6:
                        i.posX = 620;
                        break;

                }
            anterior = random;

            } else {
                random = Math.ceil(Math.random() * 4)
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
            gameOver()
            clearInterval(this.timer)
        } 
    
    // Collision Bottom Rigth
        if (arrCar[i].posY <= player.posY &&
        arrCar[i].posY + arrCar[i].height >= player.posY &&
        arrCar[i].posX <= player.posX + player.width &&
        arrCar[i].posX + arrCar[i].width > player.posX){
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

