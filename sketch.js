var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;
var cars ,car1,car2,car3,car4; // C-38 SA
var track,car1_Img,car2_Img,car3_Img,car4_Img; //C-39 SA
var finishedPlayers =0; // C-41 LB
var passedFinish; // C-41 LB

//C-39 SA
function preload(){
  track = loadImage("../images/track.jpg");
  car1_Img = loadImage("../images/car1.png");
  car2_Img = loadImage("../images/car2.png");
  car3_Img = loadImage("../images/car3.png");
  car4_Img = loadImage("../images/car4.png");
  ground = loadImage("../images/ground.png");

  //C-41 LB
  bronze_img = loadImage("images/bronze.png");
  silver_img = loadImage("images/silver.png");
  gold_img = loadImage("images/gold.png");
}

function setup(){
  canvas = createCanvas(displayWidth-20,displayHeight-20); //C-38 TA
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  background("lightblue");
  //finishedPlayers - C-41 LB 
  if(playerCount === 4 && finishedPlayers === 0){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }

  //C-39 SA
  if(gameState === 2 && finishedPlayers ===4){
    //C-41 LB
    //game.end();
    game.displayRanks();
  }

  //C-41 LB
  if(finishedPlayers === 4){
    game.update(2);
  }
}
