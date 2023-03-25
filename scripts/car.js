
//Prototipo
function Cars(vida,posX,posY,speedX,speedY,size){
    this.vida = vida
    this.posX = posX
    this.posY = posY
    this.speedX = speedX
    this.speedY = speedY
    this.size = size
}

// Coche del Jugador
function Player(score,Vida, posX, posY, speedX, speedY, size){
    Cars.call(this, Vida, posX, posY, speedX, speedY, size)
    this.score = 0
}
Player.prototype = Object.create(Cars.prototype)
Player.prototype.constructor = Player

//New player with Start parameters.
var player = new Player(
    0,      //score
    3,      //vida
    300,    //posX
    0,    //posY
    80,     //speedX
    100,    //sppedY
    100     //size
)

Player.prototype.start = function(){

}

//Recive un ObjPlayer con la nueva posX -> Injecta en DOM
Player.prototype.newPosX = function (player){
    var playerCar = document.querySelector('.player1');
    playerCar.setAttribute('style', `transform: translateX(${player.posX}px)`)
}

//Unir Eje X e eje y en 1
Player.prototype.newPosY = function (player){
    var playerCarY = document.querySelector('.player1');
    playerCarY.setAttribute('style', `transform: translateY(${player.posY}px)`)
}

var rivalCar  = new Cars(
    3,      //vida
    300,    //posX
    0,    //posY
    80,     //speedX
    10,    //speedY
    100     //size
    )
    
    var rivalIntervalID
    var screen = document.querySelector('.screen_game_mid')

Cars.prototype.newRival = function(){
    //Mostrar en HTML
    const createRival = document.createElement('div')
    createRival.setAttribute('class','rival')
    screen.appendChild(createRival)
    //var interval  = Math.floor(Math.random()*10)
    rivalIntervalID = setInterval(rivalCar.newPosY,50)
}

Cars.prototype.newPosY = function (){
    //posY > Maximo de la pantalla.
    if(rivalCar.posY < 1100){
    rivalCar.posY += rivalCar.speedY;
    } else {
        clearInterval(rivalIntervalID)
//        screen.removeChild(rivalDOM)
    }
    var rivalDOM = document.querySelector('.rival');
    rivalDOM.setAttribute('style', `transform: translateY(${rivalCar.posY}px)`)
}
rivalCar.newRival(rivalCar)
