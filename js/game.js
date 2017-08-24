var gameScreen = {
  width: 800,
  height: 600
};

var block = {
  width: 64,
  height: 32,
  blockPerRow: function() {
    return parseInt(gameScreen.width / this.width);
  }
};


var blocks;
var platform;
var ball;
var game = new Phaser.Game(gameScreen.width, gameScreen.height, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var cursor;



function preload() {
  game.load.image("blueBlock" , "assets/blueBlock.png");
  game.load.image("redBlock","assets/redBlock.png");
  game.load.image("greenBlock","assets/greenBlock.png");
  game.load.spritesheet("mediumPlatform","assets/mediumPlatform.png");
  game.load.spritesheet("redBall","assets/redBall.png");
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  cursor = game.input.keyboard.createCursorKeys();


  blocks = game.add.group();
  blocks.enableBody = true;
  blocks.physicsBodyType = Phaser.Physics.ARCADE;
  ball = game.add.sprite(20,460,"redBall");
  platform = game.add.sprite(20,500,"mediumPlatform");

  game.physics.arcade.enable([ball,platform,blocks]);
  initBlock();
  initPlatform();
  initBall();
}

function update() {
    game.physics.arcade.collide(platform,ball);
    game.physics.arcade.collide(ball,blocks,destroyBlock,null,this)
    platform.body.velocity.x = 0;
    if(cursor.left.isDown){
      platform.body.velocity.x = -450;
    }else if(cursor.right.isDown){
      platform.body.velocity.x = 450;
    }

    if(ball.body.blocked.down === true){
      ball.kill();
      console.log("You Lose");
    }

    if(blocks.countLiving() == 0){
      console.log('hai vinto')
    }
}


function initBlock(){
  createBlocks("green",24,30);
}

function initPlatform(){
  platform.body.collideWorldBounds = true;
  platform.body.immovable = true;
}

function initBall(){
    ball.body.velocity.setTo(300, 300);
    ball.body.bounce.setTo(1);
    ball.body.collideWorldBounds = true;
}

function createBlocks(color,number,startHeight,distanceBetweenRow = block.height + 2 ){
  var height = startHeight;
  var width = 0;
  var blockPerRow = block.blockPerRow();
  for(var i = 1; i <= number ; i++){
      //Check if it need to create a new row
      if((i - 1) != 0  && ((i - 1) % blockPerRow) === 0){
        height += distanceBetweenRow;
        width = 0;
      }
      var b = game.add.sprite(width,height,color + "Block");
      blocks.add(b);
      b.body.immovable = true;
      width += (block.width + 2);
  }
}

function destroyBlock(ball,block){
  block.kill();
}
