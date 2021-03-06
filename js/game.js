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
var game = new Phaser.Game(gameScreen.width, gameScreen.height, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
});
var cursor;
var text;
var gameState = "start";


function preload() {
  game.load.image("blueBlock", "assets/blueBlock.png");
  game.load.image("redBlock", "assets/redBlock.png");
  game.load.image("greenBlock", "assets/greenBlock.png");
  game.load.spritesheet("mediumPlatform", "assets/mediumPlatform.png");
  game.load.spritesheet("redBall", "assets/redBall.png");
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  cursor = game.input.keyboard.createCursorKeys();
  initGame();

}

function initGame() {
  blocks = game.add.group();
  blocks.enableBody = true;
  blocks.physicsBodyType = Phaser.Physics.ARCADE;

  var style = {
    font: "bold 32px Arial",
    fill: "#fff",
    boundsAlignH: "center",
    boundsAlignV: "middle"
  };
  text = game.add.text(0, 220, "Click on the screen to start the game", style);

  text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
  text.setTextBounds(0, 100, 800, 100);
  initSprite();
}

function initSprite() {
  //the platform appears at the center of the screen
  var platform_x_pos = (gameScreen.width / 2) - (129 / 2);
  platform = game.add.sprite(platform_x_pos, 436, "mediumPlatform");
  //the ball appears at the center of the platform
  var ball_x_pos = platform_x_pos + (129 / 2) - 13;
  ball = game.add.sprite(ball_x_pos, 410, "redBall");
  game.physics.arcade.enable([ball, platform, blocks]);
  initBlock();
}

function update() {

  if (game.input.activePointer.isDown && gameState === "start") {
    gameState = "started";
    startGame();
  } else if (game.input.activePointer.isDown && gameState === "finished") {
    gameState = "started";
    startGame();
  }

  game.physics.arcade.collide(platform, ball);
  game.physics.arcade.collide(ball, blocks, destroyBlock, null, this)
  platform.body.velocity.x = 0;

  if (cursor.left.isDown && gameState === "started") {
    platform.body.velocity.x = -450;
  } else if (cursor.right.isDown && gameState === "started") {
    platform.body.velocity.x = 450;
  }

  if (ball.body.blocked.down === true) {
    gameState = "finished";
    text.setText("You Lose! Click on the screen to restart the game!");
    finishGame();
  } else if (blocks.countLiving() == 0) {
    gameState = "finished";
    text.setText("You Win! Click on the screen to restart the game!");
    finishGame();
  }
}



function startGame() {
  text.setText("");
  initPlatform();
  initBall();
}

function finishGame() {
  ball.kill();
  platform.kill();
  blocks.removeAll();
  initSprite();
}


function initBlock() {
  createBlocks("green", 12, 100);
  createBlocks("red",12, 133);
}

function initPlatform() {
  platform.body.collideWorldBounds = true;
  platform.body.immovable = true;
}

function initBall() {
  ball.body.velocity.setTo(300, 300);
  ball.body.bounce.setTo(1);
  ball.body.collideWorldBounds = true;
}

function createBlocks(color, number, startHeight, distanceBetweenRow = block.height + 2) {
  var height = startHeight;
  var width = 0;
  var blockPerRow = block.blockPerRow();
  for (var i = 1; i <= number; i++) {
    //Check if it need to create a new row
    if ((i - 1) != 0 && ((i - 1) % blockPerRow) === 0) {
      height += distanceBetweenRow;
      width = 0;
    }
    var b = game.add.sprite(width, height, color + "Block");
    blocks.add(b);
    b.body.immovable = true;
    width += (block.width + 2);
  }
}

function destroyBlock(ball, block) {
  block.kill();
}
