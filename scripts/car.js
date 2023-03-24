function Car(){
    this.posLeft
    this.posRight
}
// Coche del Jugado r
var player = {
    vida:3,
    score:0,
    posX:0,
    posY:0,
}

player = document.querySelector('.player1');
console.log(player)






//var ancho=window.innerWidth
//var alto= window.innerWidth






//
var board = document.querySelector('.screen_game_mid');
console.log(board.scrollWidth)

//board.innerWidth



//Movimiento del coche Player 1

//Añadiendo captura de eventos al pulsar tecla.
const tecla = window.addEventListener("keydown", function(event){
    console.log(event)
    if (event.key == "ArrowLeft"){
       console.log("hola")
       player.posX -= 100;
       console.log(player.posX)

        
    } else if (event.key == "ArrowRight"){
        console.log("hola pepe")
        player.posX += 100;
        console.log(player.posX)

   }
    player.setAttribute('style', `transform: translateX(${player.posX}px)`)    
});



//style = "left:1vh; right:1vh; bottom: 10px;

// Calculando referencia del coche a través del scroll.Width (referencia)

function spawnPla (){

    var spawn=Math.floor(board.scrollWidth/2)
    console.log(spawn)

}
spawnPla(); player.posX = 100



//player.setAttribute('style', `transform: translateX(${player.posX}px)`)