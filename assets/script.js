//Credits to https://css-tricks.com/learn-canvas-snake-game/ for the tutorial
var SnakeGame = {};

SnakeGame.game = (function(){ 
  var ctx;
  SnakeGame.width = 400;
  SnakeGame.height = 400;
  SnakeGame.blockSize = 10;
  var frameLength = 100; //new frame every 0.5 seconds

//Initiate Program
function init(){
$('body').append('<canvas id="snakeJS">');
var $canvas = $('#snakeJS');
$canvas.attr('height', SnakeGame.height);
$canvas.attr('width', SnakeGame.width);
var canvas = $canvas[0];
ctx = canvas.getContext('2d'); 
Snake = SnakeGame.Snake;
Apple = SnakeGame.Apple;
Apple.drawApple(ctx);
gameLoop();
}

function gameLoop(){
  ctx.clearRect(0,0,SnakeGame.height, SnakeGame.width)
  Snake.advanceSnake();
  Snake.drawSnake(ctx);

 setTimeout(gameLoop, frameLength);
}

return{
     init:init
};
})();


//Draws the apple
SnakeGame.Apple = (function(){
var apple_Position = [];
apple_Position = [20,20];

function Draw_Apple(ctx){
ctx.save();
ctx.fillStyle = '#4682B4';
ctx.fillStoke = 'black';
var radius = SnakeGame.blockSize/2;
var x = SnakeGame.blockSize * Math.round(Math.random() * SnakeGame.width/ SnakeGame.blockSize)  ;
var y = SnakeGame.blockSize * Math.round(Math.random() * SnakeGame.width/ SnakeGame.blockSize) ;
ctx.beginPath();
ctx.arc(x, y,SnakeGame.blockSize/2 ,0,2*Math.PI, true);
ctx.fill();
ctx.restore();
}

return{
  drawApple : Draw_Apple
};


})();




//Draws the snake
SnakeGame.Snake = (function(){

  var positionArray = [];
  positionArray.push([6,4]);
  positionArray.push([5,4]);
  positionArray.push([4,4]);
  var direction = 'right';

function DrawSnake(ctx){
  ctx.save();
  ctx.fillStyle = "#cccccc";
    ctx.strokeStyle ="black";
  for (var i = 0; i < positionArray.length; i++){

    FillSnake(ctx, positionArray[i]);
  }
  ctx.restore();

}

function FillSnake(ctx, position){
  var x = SnakeGame.blockSize * position[0];
  var y = SnakeGame.blockSize * position[1];

  ctx.fillRect(x, y, SnakeGame.blockSize, SnakeGame.blockSize);
  ctx.strokeRect(x, y, SnakeGame.blockSize, SnakeGame.blockSize);

}


function AdvanceSnake(){

  //moveSnake[0] += 1; //add 1 to the x position 

  $(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        direction = 'left';
        break;

        case 38: // up
        direction = 'up';
        break;

        case 39: // right
        direction = 'right';
        break;

        case 40: // down
        direction ='down';

        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  });
  var moveSnake;
  moveSnake = positionArray[0].slice();
  if(direction == 'right'){
  moveSnake[0] += 1;
  }
   if(direction == 'left'){
  moveSnake[0] -= 1;
  }
   if(direction == 'up'){
  moveSnake[1] -= 1;
  }
   if(direction == 'down'){
  moveSnake[1] += 1;
  }
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