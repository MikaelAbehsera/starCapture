var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 300
      },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);

function preload() {
  this.load.image("sky", "assets/sky.png");
  this.load.image("ground", "assets/platform.png");
  this.load.image("star", "assets/star.png");
  this.load.image("bomb", "assets/bomb.png");
  this.load.spritesheet("dude",
    "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    }
  );
}

var platforms;
var player;

function create() {
  // add sky png as backround
  this.add.image(400, 300, "sky");

  platforms = this.physics.add.staticGroup();

  // create 3 platforms + the ground
  platforms.create(400, 568, "ground").setScale(2).refreshBody();
  platforms.create(600, 400, "ground");
  platforms.create(50, 250, "ground");
  platforms.create(750, 220, "ground");

  //// all the player aka "dude" code ////

  // add dynamic physics to player body // player has 9 frames total ==> 4 for running left ==> 1 for facing the camera ==> 4 for running right
  player = this.physics.add.sprite(100, 450, "dude");

  // set bounce scale for player
  player.setBounce(0.2);
  // don't allow player to leave screen so add colition with world borders to true
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", {
      start: 0,
      end: 3
    }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "turn",
    frames: [{
      key: "dude",
      frame: 4
    }],
    frameRate: 20
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", {
      start: 5,
      end: 8
    }),
    frameRate: 10,
    repeat: -1
  });
}

function update() {}