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
var cursors;
var stars;

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

  // running left animation 
  this.anims.create({
    key: "left",
    // frames 0-3 for left
    frames: this.anims.generateFrameNumbers("dude", {
      start: 0,
      end: 3
    }),
    frameRate: 10,
    repeat: -1
  });

  // Front/turning sprite 
  this.anims.create({
    key: "turn",
    frames: [{
      key: "dude",
      frame: 4
    }],
    frameRate: 20
  });

  // running right animation 
  this.anims.create({
    key: "right",
    // frames 0-3 for right
    frames: this.anims.generateFrameNumbers("dude", {
      start: 5,
      end: 8
    }),
    frameRate: 10,
    repeat: -1
  });

  stars = this.physics.add.group({
    key: "star",
    repeat: 11,
    setXY: {
      x: 12,
      y: 0,
      stepX: 70
    }
  });

  stars.children.iterate(function (child) {

    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

  });

  // add a collision relation between player and platforms
  this.physics.add.collider(player, platforms);
  // add a collision relation between starts and platforms
  this.physics.add.collider(stars, platforms);
  //if user and star collide set star to null
  this.physics.add.overlap(player, stars, collectStar, null, this);



}

function update() {
  cursors = this.input.keyboard.createCursorKeys();

  if (cursors.left.isDown) {
    player.setVelocityX(-160);

    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);

    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);

    player.anims.play("turn");
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}

//GLOBAL FUNCTIONS FOR REUSING
/**
 * if user and star collide, remove star from world
 * @param {*} player player object
 * @param {*} star star object
 */
function collectStar(player, star) {
  star.disableBody(true, true);
  console.log(player);

}