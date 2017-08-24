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

var game = new Phaser.Game(gameScreen.width, gameScreen.height, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

  game.load.image("blueBlock" , "assets/blueBlock.png");
  game.load.image("redBlock","assets/redBlock.png");
  game.load.image("greenBlock","assets/greenBlock.png");
  game.load.spritesheet("mediumPlatform","assets/mediumPlatform.png");
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  blocks = game.add.group();
  createBlocks("green",24,30);
  //createBlockss("red",15,98);
  //createBlocks("blue",15,130);
  //createBlocks("green",15,162);
  game.add.sprite(20,500,"mediumPlatform")
}

function update() {
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
