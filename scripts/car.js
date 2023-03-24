function Car(){
    this.posLeft
    this.posRight
}
// Coche del Jugador
var player = {
    vida:3,
    score:0,
    posX:1,
    posY:1,
    size: 100
}

//Movimiento del coche Player 
playerCar = document.querySelector('.player1');
var board = document.querySelector('.screen_game_mid');
//Añadiendo captura de eventos al pulsar tecla.
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



borderMapColission()
//style = "left:1vh; right:1vh; bottom: 10px;

// Calculando referencia del coche a través del scroll.Width (referencia)
/*
function spawnPla (){

    var spawn=Math.floor(board.scrollWidth/2)
    console.log(spawn)

}
spawnPla(); 
//player.posX = -1
*/


//player.setAttribute('style', `transform: translateX(${player.posX}px)`)