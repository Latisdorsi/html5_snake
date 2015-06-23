//Credits to https://css-tricks.com/learn-canvas-snake-game/ for the tutorial
var SnakeGame = {};

SnakeGame.game = (function(){ 
  var ctx;
  SnakeGame.width = 400;
  SnakeGame.height = 400;
  SnakeGame.blockSize = 10;
  var frameLength = 100; //new frame every 0.5 seconds
  SnakeGame.widthInBlocks = SnakeGame.width /SnakeGame.blockSize;
  SnakeGame.heightInBlocks = SnakeGame.height /SnakeGame.blockSize;

SnakeGame.equalCoordinates = function (coord1, coord2) {
  return coord1[0] === coord2[0] && coord1[1] === coord2[1];
}

SnakeGame.checkCoordinateInArray = function (coord, arr) {
  var isInArray = false;
  $.each(arr, function (index, item) {
    if (JS_SNAKE.equalCoordinates(coord, item)) {
      isInArray = true;
    }
  });
  return isInArray;
};



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

gameLoop();
}

function gameLoop(){
  ctx.clearRect(0,0,SnakeGame.height, SnakeGame.width)
  Snake.advanceSnake(Apple);
  Snake.drawSnake(ctx);
  Apple.drawApple(ctx);
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
var x = SnakeGame.blockSize * apple_Position[0];
var y = SnakeGame.blockSize * apple_Position[1];

function Draw_Apple(ctx){
ctx.save();
ctx.fillStyle = '#4682B4';
ctx.fillStoke = 'black';
ctx.fillRect(x, y, SnakeGame.blockSize, SnakeGame.blockSize);
ctx.strokeRect(x, y, SnakeGame.blockSize, SnakeGame.blockSize);
ctx.restore();
}

function New_Position(){
  x = Math.Floor(Math.Random() * SnameGame.blockSize - ) 


}

function Get_Position(){
  return apple_Position;
}


return{
  drawApple : Draw_Apple,
  getPosition: Get_Position 
};


})();




//Draws the snake
SnakeGame.Snake = (function(){

  var positionArray = [];
  positionArray.push([6,4]);
  positionArray.push([5,4]);
  positionArray.push([4,4]);
  var direction = 'right';
  Apple = SnakeGame.Apple;

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


function AdvanceSnake(apple){

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

  if (moveSnake[0] <= -1 || moveSnake[1] <= -1 || moveSnake[0] > ( SnakeGame.widthInBlocks - 1) || 
    moveSnake[1] > (SnakeGame.heightInBlocks - 1) ){
  direction = 'right';
    while(positionArray.length > 0) {
    positionArray.pop();
    }
  positionArray.push([6,4]);
  positionArray.push([5,4]);
  positionArray.push([4,4]);

  } 

  else{
  if(direction == 'right'){
  moveSnake[0] += 1;
  }
  else if(direction == 'left'){
  moveSnake[0] -= 1;
  }
  else if(direction == 'up'){
  moveSnake[1] -= 1;
  }
  else if(direction == 'down'){
  moveSnake[1] += 1;
  }

  positionArray.unshift(moveSnake);
  if (SnakeGame.equalCoordinates(positionArray[0], Apple.getPosition()) == true){

  }
  else{
    positionArray.pop();
  }

  }
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