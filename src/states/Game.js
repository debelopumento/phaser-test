/* globals __DEV__ */
import Phaser from 'phaser';
import Mushroom from '../sprites/Mushroom';

export default class extends Phaser.State {
  init() {}
  preload() {}

  create() {
    //create world
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.add.sprite(0, 0, 'star');

    let platforms = this.add.group();
    platforms.enableBody = true;
    const ground = platforms.create(0, this.world.height - 64, 'platform');
    ground.scale.setTo(2, 2);
    ground.body.imovable = true;
    let ledge = platforms.create(100, 200, 'platform');
    ledge.scale.setTo(0.4, 0.7);
    ledge.body.immovable = true;

    ledge = platforms.create(350, 100, 'platform');
    ledge.scale.setTo(0.5, 0.9);
    ledge.body.immovable = true;

    //create mushroom
    this.mushroom = new Mushroom({
      game: this,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'mushroom',
    });
    this.add.existing(this.mushroom);
    this.physics.arcade.enable(this.mushroom);
    this.mushroom.body.bounce.y = 0.2;
    this.mushroom.body.gravity.y = 300;
    this.mushroom.body.collideWorldBounds = true;

    this.shroom = new Mushroom({
      game: this,
      x: this.world.centerX,
      y: 0,
      asset: 'mushroom',
    });
    this.add.existing(this.shroom);
    this.physics.arcade.enable(this.shroom);
    this.shroom.body.bounce.y = 0.2;
    this.shroom.body.gravity.y = 300;
    this.shroom.body.collideWorldBounds = true;

    //create player
    this.player = this.game.add.sprite(
      this.world.centerX,
      this.game.world.height - 150,
      'dude'
    );
    this.game.physics.arcade.enable(this.player);
    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 300;
    this.player.body.collideWorldBounds = true;
    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);

    const cursors = this.game.input.keyboard.createCursorKeys();
  }

  update() {
    //console.log(this.game.physics.arcade.collide);
    this.game.physics.arcade.collide(this.mushroom, this.shroom);
    this.game.physics.arcade.collide(this.player, this.mushroom);
  }

  render() {}
}
