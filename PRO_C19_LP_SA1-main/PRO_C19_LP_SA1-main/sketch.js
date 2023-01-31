var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var reaper, reaperImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  reaperImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  reaper = createSprite(300, 300);
  reaper.addImage("reaper", reaperImg);
  reaper.scale = .3;

  doorsGroup = createGroup();
  climbersGroup = createGroup();
  invisibleblocksGroup = createGroup();

}

function draw() {
  background(200);
  
  if(gameState == "play")
  {
    if(tower.y > 400){
      tower.y = 300
    }
  
  //directions
  if(keyDown("left"))  
  {
    reaper.x = reaper.x - 5;
  }

  if(keyDown("right"))
  {
    reaper.x = reaper.x + 5;
  }

  if(keyDown("space"))
  {
    reaper.velocityY = -10;
  }

  //GRAVITY
  reaper.velocityY = reaper.velocityY + 0.8;
  
  //CALLING FUNCTIONS
  spawnObstacles();
  
  if(reaper.isTouching(climbersGroup))
  {
    reaper.velocityY = 0;
  }

  if(reaper.isTouching(invisibleblocksGroup))
  {
    gameState = "end"
  }
}
  
  if(gameState == "end")
  {
    textSize(30);
    text("game over sucka", 230, 250)
  }


  drawSprites();
}

function spawnObstacles()
{
if( frameCount % 200 == 0)
{
  var door = createSprite(200, -15);
  var climber = createSprite(200, 10);
  var invisibleblock = createSprite(200, 15);

  door.addImage("door", doorImg);
  climber.addImage("climber", climberImg);

  door.velocityY = 1;
  climber.velocityY = 1;
  invisibleblock.velocityY = 1;

  //invisibleblock.visible = false;
  invisibleblock.width = climber.width;
  invisibleblock.height = 2;

  door.x = Math.round(random(120, 550))
  climber.x = door.x;
  invisibleblock.x = door.x;

  door.depth = reaper.depth;
  reaper.depth += 1;
  
  door.lifetime = 800;
  climber.lifetime = 800;
  invisibleblock.lifetime = 800;

  doorsGroup.add(door);
  climbersGroup.add(climber);
  invisibleblocksGroup.add(invisibleblock);

  invisibleblock.debug = true;
}
}
//                                                                                                                                                                                                                      (o゜▽゜)o☆