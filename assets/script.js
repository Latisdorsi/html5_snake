//Credits to https://css-tricks.com/learn-canvas-snake-game/ for the logic
var SnakeGame = {};

SnakeGame.game = (function(){ 
  var ctx;

  SnakeGame.width = 400;
  SnakeGame.height = 400;
  SnakeGame.blockSize = 10;
  var frameLength = 500; //new frame every 0.5 seconds

//Initiate Program
function init(){
$('body').append('<canvas id="snakeJS">');
var $canvas = $('#snakeJS');
$canvas.attr('height', SnakeGame.height);
$canvas.attr('width', SnakeGame.width);
var canvas = $canvas[0];
ctx = canvas.getContext('2d'); 
Snake = SnakeGame.Snake;
gameLoop();
}

function gameLoop(){
  Snake.advanceSnake();
  Snake.drawSnake(ctx);
  setTimeout(gameLoop, frameLength);
}

return{
     init:init
};
})();

//Draws the snake
SnakeGame.Snake = (function(){

  var positionArray = [];
  positionArray.push = ([6,4]);
  positionArray.push = ([5,4]);
  positionArray.push = ([4,4]);

function DrawSnake(ctx){
  ctx.save();
  ctx.fillStyle = "#cccccc";

  for (var i = 0; i < positionArray.length; i++){
    console.log("test"); 
    FillSnake(ctx, positionArray[i]);
  }
  ctx.restore();

}

function FillSnake(ctx, position){
  var x = SnakeGame.blockSize * position[0];
  var y = SnakeGame.blockSize * position[1];
  ctx.fillRect(x, y, SnakeGame.blockSize, snakeGame.blockSize);
  
}

function AdvanceSnake(){
  var moveSnake;
  moveSnake = positionArray.slice();
  moveSnake[0] += 1; //add 1 to the x position 
  positionArray.unshift(moveSnake);
  positionArray.pop();
}


return {

  drawSnake : DrawSnake,
  advanceSnake : AdvanceSnake
};
  })();


$(document).ready(function () {
  SnakeGame.game.init();
});

//ctx.fillstyle();
//ctx.fillrect();