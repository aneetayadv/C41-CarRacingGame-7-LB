class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    //C-38 SA
    car1 = createSprite(100,200);
    car1.addImage(car1_Img); //C-39 SA

    car2 = createSprite(300,200);
    car2.addImage(car2_Img); //C-39 SA

    car3 = createSprite(500,200);
    car3.addImage(car3_Img); //C-39 SA

    car4 = createSprite(700,200);
    car4.addImage(car4_Img); //C-39 SA

    cars = [car1,car2,car3,car4];
    passedFinish= false; // C-41 LB
  }

  play(){
    form.hide();
   // textSize(30);
   // text("Game Start", 120, 100)
   
   Player.getPlayerInfo();
   player.getFinishedPlayers(); // C-41 LB

    if(allPlayers !== undefined){
     // C-39 SA
     background("#C68767");
     image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
     

     //c-38 SA 
     var index = 0; //Index of the array

     // x and y position of the cars
     var x = 175; // C-39 SA
     var y;

      for(var plr in allPlayers){
        //add 1 to index for every loop
        index = index +1;
        console.log(index + " - " +player.index);
        //position cars a little away from each other in x direction
        x = x+200;

        //use data from database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if(index === player.index) {
          //C-40 SA [Circle around current car]
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);

          cars[index-1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }

        //Display player name along with cars - C-41 LB
        textAlign(CENTER);
        textSize(20);
        text(allPlayers[plr].name, cars[index - 1].x, cars[index - 1].y + 75);
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null && passedFinish!==true){
      player.distance +=50
      player.update();
    }

    //C-39 SA
    if(player.distance > 3860 && passedFinish===false){
      //gameState = 2;
      //C-41 LB
      Player.updateFinishedPlayers();
      player.rank= finishedPlayers;
      player.update();
      passedFinish= true;
    }
    drawSprites(); //C-38 SA
  }

  //C-39 SA
  end(){
    console.log("Game Ended");
  }

  //C-40 LB
  reset(){
    database.ref('/').update({
      players: null,
      finishedPlayers: 0, // C-41 LB
      gameState : 0
    })
  }

  //C-41 LB
  displayRanks(){
    camera.position.x =0;
    camera.position.y = 0;
     
    imageMode(CENTER);
    Player.getPlayerInfo();

    image(bronze_img, displayWidth/-4, -100 + displayHeight/9, 200, 240);
    image(silver_img, displayWidth/4, -100 + displayHeight/10, 225, 270);
    image(gold_img, 0, -100, 250, 300);

    textAlign(CENTER);
    textSize(50);
    for(var plr in allPlayers){
      if(allPlayers[plr].rank === 1){
        text("1st :  "+allPlayers[plr].name,0,85);
      }
      else if(allPlayers[plr].rank === 2){
        text("2nd: " + allPlayers[plr].name, displayWidth/4, displayHeight/9 + 73);
      }else if(allPlayers[plr].rank === 3){
        text("3rd: " + allPlayers[plr].name, displayWidth/-4, displayHeight/10 + 76);
      }else{
        textSize(30);
        text("Honorable Mention: " + allPlayers[plr].name, 0, 225);
      }
    }
  }
}
