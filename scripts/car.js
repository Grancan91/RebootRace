
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
    300,    //posY
    80,     //speedX
    200,    //sppedY
    100     //size
    )

Player.prototype.start = function(){

}
//Recive un ObjPlayer con la nueva posX -> Injecta en DOM
Player.prototype.newPosX = function (player){
    var playerCar = document.querySelector('.player1');
    playerCar.setAttribute('style', `transform: translateX(${player.posX}px)`)
}

//Añadiendo captura de eventos al pulsar tecla.
/*
const tecla = window.addEventListener("keydown", function (event) {
    var movement = 100
    
        if (event.key == "ArrowLeft" && (player.posX - movement) > 0) {
        player.posX -= movement;
    } else if (event.key == "ArrowRight" && (player.posX + player.size) < 950) {
        player.posX += movement;
        console.log(player.posX)
    }
    playerCar.setAttribute('style', `transform: translateX(${player.posX}px)`)
});
*/
