/* globals __DEV__ */
import Phaser from 'phaser';
import StaticAsset from '../sprites/staticAsset';
import Player from '../sprites/player';

export default class extends Phaser.State {
  init() {}
  preload() {}

  create() {
    //create world
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.add.sprite(0, 0, 'star');

    this.ledge = new StaticAsset({
      game: this,
      x: 50,
      y: 250,
      asset: 'platform',
    });
    this.add.existing(this.ledge);
    this.ledge.scale.setTo(0.5, 0.9);
    this.physics.arcade.enable(this.ledge);
    this.ledge.enableBody = true;
    this.ledge.body.immovable = true;

    this.ledge2 = new StaticAsset({
      game: this,
      x: 350,
      y: 200,
      asset: 'platform',
    });
    this.add.existing(this.ledge2);
    this.ledge2.scale.setTo(0.5, 0.9);
    this.physics.arcade.enable(this.ledge2);
    this.ledge2.enableBody = true;
    this.ledge2.body.immovable = true;

    this.ledge3 = new StaticAsset({
      game: this,
      x: 650,
      y: 300,
      asset: 'platform',
    });
    this.add.existing(this.ledge3);
    this.ledge3.scale.setTo(0.5, 0.9);
    this.physics.arcade.enable(this.ledge3);
    this.ledge3.enableBody = true;
    this.ledge3.body.immovable = true;

    this.ledge3 = new StaticAsset({
      game: this,
      x: 850,
      y: 300,
      asset: 'platform',
    });
    this.add.existing(this.ledge3);
    this.ledge3.scale.setTo(0.5, 0.9);
    this.physics.arcade.enable(this.ledge3);
    this.ledge3.enableBody = true;
    this.ledge3.body.immovable = true;

    //create player
    this.player = new Player({
      game: this,
      x: 100,
      y: 150,
      asset: 'dude',
    });
    this.add.existing(this.player);
    this.game.physics.arcade.enable(this.player);
    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 300;
    this.player.body.collideWorldBounds = true;

    //const cursors = this.game.input.keyboard.createCursorKeys();
  }

  update() {
    //setInterval(this.generateLedge, 1000);
    //console.log(this.game.physics.arcade.collide);
    this.physics.arcade.collide(this.player, this.ledge);
    this.physics.arcade.collide(this.player, this.ledge2);
  }

  render() {}
}
