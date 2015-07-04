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
    if (SnakeGame.equalCoordinates(coord, item)) {
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
bindEvents();
gameLoop();
}

function gameLoop(){
  ctx.clearRect(0,0,SnakeGame.height, SnakeGame.width)
  Snake.advanceSnake(Apple);
  Snake.drawSnake(ctx);
  Apple.drawApple(ctx);
  Apple.getPosition();
  setTimeout(gameLoop, frameLength);
}

function bindEvents() {
    var keysToDirections = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    };

$(document).keydown(function (event) {
      var key = event.which;
      var direction = keysToDirections[key];

      if (direction) {
        Snake.setDirection(direction);
        event.preventDefault();
      }
      else if (key === 32) {
        restart();
      }
     });
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


function Get_Position(){
  return apple_Position;
}
  //get a random position within the game bounds
  function getRandomPosition() {
    x = SnakeGame.blockSize * Math.round(Math.random() * (SnakeGame.widthInBlocks));
    y = SnakeGame.blockSize * Math.round(Math.random() * (SnakeGame.heightInBlocks));

    return [x, y];
  }
  //Determines Whether Snake Is Already Existing 
  function Change_Position(snake){
  var  newPosition = getRandomPosition();
      if (SnakeGame.equalCoordinates(newPosition, snake)){

        return Change_Position(snake);
        }


      else {
        apple_Position[0] = x/SnakeGame.blockSize;
        apple_Position[1] = y/SnakeGame.blockSize;
      }
      console.log(newPosition);
      console.log(snake);

}

return{
  drawApple : Draw_Apple,
  getPosition: Get_Position, 
  changePosition : Change_Position
};


})();




//Draws the snake
SnakeGame.Snake = (function(){

  var positionArray = [];
  var x, y;
  positionArray.push([6,4]);
  positionArray.push([5,4]);
  positionArray.push([4,4]);
  var direction = 'right', nextDirection = direction;


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
  x = SnakeGame.blockSize * position[0];
  y = SnakeGame.blockSize * position[1];

  ctx.fillRect(x, y, SnakeGame.blockSize, SnakeGame.blockSize);
  ctx.strokeRect(x, y, SnakeGame.blockSize, SnakeGame.blockSize);

}

function setDirection(newDirection) {
    var allowedDirections;

    switch (direction) {
    case 'left':
    case 'right':
      allowedDirections = ['up', 'down'];
      break;
    case 'up':
    case 'down':
      allowedDirections = ['left', 'right'];
      break;
    default:
      throw('Invalid direction');
    }
    if (allowedDirections.indexOf(newDirection) > -1) {
      nextDirection = newDirection;
    }

  }



function AdvanceSnake(apple){


  var snakeCollision = false;
  var moveSnake, rest;
  moveSnake = positionArray[0].slice();
  rest = positionArray.slice(1);
  snakeCollision = SnakeGame.checkCoordinateInArray(moveSnake, rest);
  direction = nextDirection;
  
    if (snakeCollision == true | moveSnake[0] <= -1 || moveSnake[1] <= -1 || moveSnake[0] > ( SnakeGame.widthInBlocks - 1) || 
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

        positionArray.unshift(moveSnake);
        //The snake must not move on a opposite direction
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
        if (SnakeGame.equalCoordinates(positionArray[0], Apple.getPosition()) == true){
          //Insert Score System Here
            apple.changePosition([x,y]);
        }
        else{
          positionArray.pop();
        }

    }
}

function SnakePosition(){
  return positionArray[0];
}


return {

  drawSnake : DrawSnake,
  setDirection : setDirection,
  advanceSnake : AdvanceSnake,
  snakePosition : SnakePosition

};
  })();


$(document).ready(function() {
  SnakeGame.game.init();
});

//ctx.fillstyle();
//ctx.fillrect();