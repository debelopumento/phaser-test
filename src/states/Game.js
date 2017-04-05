/* globals __DEV__ */
import Phaser from 'phaser';
import StaticAsset from '../sprites/staticAsset';
import Player from '../sprites/player';

export default class GameState extends Phaser.State {
  init() {}
  preload() {}

  create() {
    //initial physics in world
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.add.sprite(0, 0, 'star');

    //create ledge group
    this.ledges = this.add.group();
    this.physics.arcade.enable(this.ledges);
    this.ledges.enableBody = true;

    //generate ledge and add it to ledge group
    this.ledge = new StaticAsset({
      game: this,
      x: 50,
      y: 250,
      asset: 'platform',
    });
    this.physics.arcade.enable(this.ledge);
    this.ledge.scale.setTo(1, 0.9);
    this.ledge.enableBody = true;
    this.ledge.body.immovable = true;
    this.ledges.add(this.ledge);

    //create ledges
    this.ledge2 = new StaticAsset({
      game: this,
      x: 250,
      y: 200,
      asset: 'platform',
    });
    this.add.existing(this.ledge2);
    this.ledge2.scale.setTo(0.5, 0.9);
    this.physics.arcade.enable(this.ledge2);
    this.ledge2.enableBody = true;
    this.ledge2.body.immovable = true;
    this.ledges.add(this.ledge2);

    this.ledge3 = new StaticAsset({
      game: this,
      x: 500,
      y: 300,
      asset: 'platform',
    });
    this.add.existing(this.ledge3);
    this.ledge3.scale.setTo(0.5, 0.9);
    this.physics.arcade.enable(this.ledge3);
    this.ledge3.enableBody = true;
    this.ledge3.body.immovable = true;
    this.ledges.add(this.ledge3);

    this.ledge4 = new StaticAsset({
      game: this,
      x: 750,
      y: 300,
      asset: 'platform',
    });
    this.add.existing(this.ledge4);
    this.ledge4.scale.setTo(0.5, 0.9);
    this.physics.arcade.enable(this.ledge4);
    this.ledge4.enableBody = true;
    this.ledge4.body.immovable = true;
    this.ledges.add(this.ledge4);

    //create player
    this.player = new Player({
      game: this.game,
      x: 50,
      y: 150,
      asset: 'dude',
    });
    this.add.existing(this.player);
    this.player.animations.add('run', [5, 6, 7, 8], 10, true);
    this.player.animations.play('run');
  }

  update() {
    this.physics.arcade.collide(this.player, this.ledges);
    if (this.player.position.y > 400) {
      this.state.start('Over');
    }
  }

  render() {}
}
