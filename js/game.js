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
var game = new Phaser.Game(gameScreen.width, gameScreen.height, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var cursor;


function preload() {
  game.load.image("blueBlock" , "assets/blueBlock.png");
  game.load.image("redBlock","assets/redBlock.png");
  game.load.image("greenBlock","assets/greenBlock.png");
  game.load.spritesheet("mediumPlatform","assets/mediumPlatform.png");
}

function create() {
  cursor = game.input.keyboard.createCursorKeys();
  game.physics.startSystem(Phaser.Physics.ARCADE);
  blocks = game.add.group();
  createBlocks("green",24,30);
  //createBlockss("red",15,98);
  //createBlocks("blue",15,130);
  //createBlocks("green",15,162);
  platform = game.add.sprite(20,500,"mediumPlatform");
  game.physics.arcade.enable([platform]);

  platform.body.immovable = true;
}

function update() {

  platform.body.velocity.x = 0;
  if(cursor.left.isDown){
    platform.body.velocity.x = -150;
  }else if(cursor.right.isDown){
    platform.body.velocity.x = 150;
  }
}

function createBlocks(color,number,startHeight,distanceBetweenRow = block.height + 2 ){
  console.log(distanceBetweenRow);
  var height = startHeight;
  var width = 0;
  var blockPerRow = block.blockPerRow();
  for(var i = 1; i <= number ; i++){
      //Check if it need to create a new row
      if((i - 1) != 0  && ((i - 1) % blockPerRow) === 0){
        height += distanceBetweenRow;
        width = 0;
      }

      blocks.create(width,height,color + "Block");
      width += (block.width + 2);
  }
}
