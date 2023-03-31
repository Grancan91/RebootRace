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
    500,    //posX
    600,      //posY
    150,     //speedX
    150,    //sppedY
    80,    //width
    175     //Heigth
    )

var rivalCar  = new Cars(
    3,      //vida
    50,    //posX
    -300,      //posY
    80,     //speedX
    2,    //speedY
    80,    //width
    165,     //Heigth
    1       //id
    )

var rivalCar1 = new Cars(3, 200, -200, 80, 1, 80, 165, 2)

var rivalCar2 = new Cars(3, 350, -500, 80, 1, 80, 165, 3)

var rivalCar3 = new Cars(3, 500, -300, 80, 1, 80, 165, 3)

var rivalCar4 = new Cars(3, 650, -150, 80, 1, 80, 165, 3)

var rivalCar5 = new Cars(3, 800, -800, 80, 1, 80, 165, 3)

var arrCar = [rivalCar, rivalCar1, rivalCar2, rivalCar3, rivalCar4, rivalCar5];


//Recive a ObjPlayer with the new posX -> Inject in DOM
Player.prototype.newPos = function (player){
    var playerCar = document.querySelector('.player1');
    playerCar.style.left = `${player.posX}px`;
        playerCar.style.top = `${player.posY}px`;
        console.log("P1-X: " + player.posX)
}

var rivalIntervalID
var screen = document.querySelector('.screen_game_mid')

let speed = 100; // Rival's speed

Cars.prototype.newRival = function(id){   
    //getRandomY(300, 500)
    //Show in HTML
    var random = Math.ceil(Math.random()*5)
    console.log(random)
    this.dom = document.createElement('div')
    this.dom.style.left = this.posX + "px"
    this.dom.style.top = this.posY + "px"
    this.dom.setAttribute('class','rival')    
    this.dom.classList.add("color" + random)
    this.dom.setAttribute('id', this.spriteId)
    screen.appendChild(this.dom)
    //Movement in axis Y of Rivals
    this.timer = setInterval(this.rivalMove, speed) 
}

Cars.prototype.delRival = function () {

    arrCar.forEach(element => {
    screen.removeChild(element.dom)
    clearInterval(element.timer)
    element.posY = getRandomY(900)
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
            
                i.dom.style.top = `${i.posY}px`
                i.dom.style.left = `${i.posX}px`
                gameOver()
                
            } else {
            
                i.dom.style.top = `${i.posY}px`
                i.dom.style.left = `${i.posX}px`
            }
        }else{    
        i.posY = getRandomY(600)
        i.speedY = 1 + getRandomSpeed(3)
        //Generate new respawn of rivals
       
        }  
        
    });
}

var num
function getRandomY(max) {
     num = Math.random() * max 
        return -1*num-50
}   
function getRandomSpeed(max) {
    return Math.random() * max
}  

const score = document.querySelector(".score");

var timerscore;
Player.prototype.startScore = function(){

    timerscore = setInterval(() => {
        player.score += 1
        score.innerText = player.score
    }, 1000);
    
}

Player.prototype.stopScore = function(){
    clearInterval(timerscore);
    player.score = 0
    score.innerText = "TIME"
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

