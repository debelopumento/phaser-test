/* globals __DEV__ */
import Phaser from 'phaser';
//import Mushroom from '../sprites/Mushroom';

export default class extends Phaser.State {
  init() {}
  preload() {}

  create() {
    //create world
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.add.sprite(0, 0, 'star');

    const platforms = this.game.add.group();
    platforms.enableBody = true;
    const ground = platforms.create(0, this.game.world.height - 64, 'platform');
    ground.scale.setTo(2, 2);
    ground.body.imovable = true;
    let ledge = platforms.create(100, 200, 'platform');
    ledge.scale.setTo(0.4, 0.7);
    ledge.body.immovable = true;

    ledge = platforms.create(350, 100, 'platform');
    ledge.scale.setTo(0.5, 0.9);
    ledge.body.immovable = true;

    //create player
    const player = this.game.add.sprite(
      32,
      this.game.world.height - 150,
      'dude'
    );
    this.game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    const cursors = this.game.input.keyboard.createCursorKeys();
  }

  update() {
    //console.log(this.game.physics.arcade.collide);
    //this.game.physics.arcade.collide(this.player, this.platforms);
  }

  render() {}
}
