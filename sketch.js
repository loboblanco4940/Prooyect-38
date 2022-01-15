var tower, towerImg;
var door, doorImg, doorsGroup;
var climber, climberImg, climbersGroup;
var ghost,ghostImg, ghostGroup;
var soul,soulImg;
var invisibleBlockGroup;
var gameState = "PLAY";
var score = 0;



function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound ("spooky.wav");
  soulImg = loadImage("soul.png");

  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  soulGroup = new Group();

  score = 0;
}

function setup() {


  createCanvas(displayWidth - 20, displayHeight - 30);
  
  spookySound.loop();
  
  tower = createSprite (displayWidth - 700 ,displayHeight - 600);
  tower.addImage ("tower",towerImg);
  tower.scale = 2.3;
  tower.velocityY = 1;


  ghost = createSprite (displayWidth - 700,displayHeight - 500, 100,100);
  ghost.addImage ("ghost", ghostImg);

   textSize(70);
  stroke("yellow");
  text("soul : "+ score,displayWidth -900,displayHeight - 500);
  
  ghost.scale = 0.4;
}

function draw() {
  background('black');

 

  if (gameState === "PLAY"){
    
    if( ghost.isTouching(soulGroup)) {
      soulGroup.destroyEach();
      
      score = score + 20;
    
    }
  
  
  if (tower.y > 400 ) {
    tower.y = 300;
  }
  
  if (keyDown ("SPACE")) {
    ghost.velocityY = -5;
    camera.position.x = ghost.x ;
    camera.position.y = displayHeight/2;
  }
 
  if (keyDown("LEFT_ARROW")) {
    ghost.x = ghost.x -3;
  }
  
  if (keyDown("right_arrow")) {
    ghost.x = ghost.x + 3;
  }
  
  if (climbersGroup.isTouching(ghost)) {
    ghost.velocityY = 0;
  }
  
  if (invisibleBlockGroup.isTouching(ghost) || (ghost.Y)) {
    
    ghost.destroy();
    gameState = "END";
  }
  
  ghost.velocityY = ghost.velocityY + 0.2;

  
  
  spawnSoul();
  spawnDoors();
  drawSprites();
  }
  
  if (gameState === "END") {
    stroke ("yellow");
    fill ("yellow");
    textSize (70);
    text ("GAME OVER",displayWidth - 900 ,displayHeight - 500);
  }
}
function spawnDoors() {
    

  if ((frameCount%200) === 0) {   
      var door = createSprite (200,-50);
      var climber = createSprite (200,10);
      var invisibleBlock = createSprite(200,20);
    
      climber.addImage(climberImg);
      door.addImage(doorImg);
      
      door.x = Math.round (random(displayWidth - 100,displayHeight - 900));
      climber.x = door.x;
      climber.y = 22;
      
      door.velocityY =1;
      climber.velocityY =1;
      
      invisibleBlock.wieght = climber.wight;
      invisibleBlock.height = 1;
      
  //asignar ciclo de vida
      door.lifeTime = 800;   
      climber.lifeTime = 800;
      
  //agregar cada puerta al grupo 
      doorsGroup.add(door);
      climbersGroup.add(climber);
      
      invisibleBlock.x = door.x;
      invisibleBlock.velocityY =1;
      
      invisibleBlock.debug = true;
      invisibleBlockGroup.add(invisibleBlock);
      
      
      ghost.depth = door.depth;
      ghost.depth +=1;
    }
}
function spawnSoul() {
    
  if (frameCount % 200 === 0) {
    var soul = createSprite (200,-50);
    soul.addImage(soulImg);
    soul.x = Math.round (random(displayWidth - 100,displayHeight - 900));
    soul.velocityY =1;

    soul.scale = 0.1;
    
    ghost.depth = soul.depth;
    ghost.depth +=1;
    soul.lifeTime = 800;
    soulGroup.add(soul);
  }
}