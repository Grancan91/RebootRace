function Game(progress,dificulty){
    this.progress = progress
    this.dificulty = dificulty
}
var game = new Game(0,0)

Game.prototype.checkCollision = function(){
    console.log(rivalCar.posY)
    console.log(player.posX)
}
