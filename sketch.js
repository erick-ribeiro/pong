let xBall = 300;
let yBall = 200;
let dBall = 15;
let rBall = dBall / 2;
let xSpeedBall = 6;
let ySpeedBall = 6;

let xPlayerOne = 5;
let yPlayerOne = 150;
let xPlayerTwo = 585;
let yPlayerTwo = 150;

let widthPlayer = 10;
let heightPlayer = 90;

let speedPlayerOne = 6
let speedPlayerTwo = 6

let scorePlayerOne = 0
let scorePlayerTwo = 0

let collided = false

let error = 0;

let playerSong;
let scoreSong;
let music;

function preload(){
    music = loadSound("assepts/trilha.mp3");
    scoreSong = loadSound("assepts/ponto.mp3");
    playerSong = loadSound("assepts/raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  music.loop();
}

function draw() {
  background(0);
  
  showScore();
  
  showBall();
  moveBall();
  
  showPlayler(xPlayerOne, yPlayerOne)
  showPlayler(xPlayerTwo, yPlayerTwo)

  movePlaylerOne();  
  movePlaylerTwo();
  
  checkPlayerCollision(xPlayerOne, yPlayerOne);
  checkPlayerCollision(xPlayerTwo, yPlayerTwo);
}

function showBall(){
  fill(255)
  circle(xBall, yBall, dBall);
  
  checkBallCollision();
}

function showPlayler(x, y){
  fill(255)
  rect(x, y, widthPlayer, heightPlayer);
}


function showScore(){
  textAlign(CENTER);
  textSize(16);
  
  fill(color(255, 140, 0));
  rect(440, 10, 40, 20)
  rect(140, 10, 40, 20)
  
  fill(255)
  text(scorePlayerOne, 160, 26);
  text(scorePlayerTwo, 460, 26);
  
  scoreCommand();
}

function moveBall(){
  xBall += xSpeedBall;
  yBall += ySpeedBall;
}

function movePlaylerOne(){
  if (keyIsDown(UP_ARROW)) {
    yPlayerOne -= speedPlayerOne;
  } else if (keyIsDown(DOWN_ARROW)) {
    yPlayerOne += speedPlayerOne;
  }
}

function movePlaylerTwo(){
  speedPlayerTwo = yBall - yPlayerTwo - widthPlayer / 2 - 30;
  yPlayerTwo += speedPlayerTwo + error
  calcError()
//   if (keyIsDown(87)) {
//     yPlayerTwo -= speedPlayerTwo;
//   } else if (keyIsDown(83)) {
//     yPlayerTwo += speedPlayerTwo;
//   }
}

function calcError() {
  if (scorePlayerTwo >= scorePlayerOne) {
    error += 1;
    if (error >= 39) {
      error = 40;
    }
  } else {
    error -= 1;
    if (error <= 35) {
      error = 35;
    }
  }
}

function bugBallBorder() {
  if (xBall - rBall < 0) {
    xBall = 23;
  }
}

function checkBallCollision(){
  if (xBall + rBall > width || xBall- rBall < 0 ){
    xSpeedBall *= -1;
  }
  if (yBall + rBall > height || yBall - rBall < 0){
    ySpeedBall *= -1;
  }
}

function checkPlayerCollision(x, y) {
    collided = collideRectCircle(x, y, widthPlayer, heightPlayer, xBall, yBall, rBall);
    if (collided){
        xSpeedBall *= -1;
        playerSong.play();
    }
}

function scoreCommand(){
  if (xBall > 590){
    scorePlayerOne += 1;
    scoreSong.play();
  }
  if (xBall < 10){
    scorePlayerTwo += 1;
    scoreSong.play();
  }
}
