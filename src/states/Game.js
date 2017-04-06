/* globals __DEV__ */
import Phaser from 'phaser';
import StaticAsset from '../sprites/staticAsset';
import Player from '../sprites/player';
import config from '../config';
import getRandomInt from '../functions/getRandomInt';

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

    const generateLedges = () => {
      let ledgeXPosition = 50;
      let ledgeYPosition = config.gameHeight / 2;
      for (let i = 0; i <= 6; i++) {
        this.ledge = new StaticAsset({
          game: this,
          x: ledgeXPosition,
          y: ledgeYPosition,
          asset: 'platform',
        });
        this.add.existing(this.ledge);
        this.ledge.scale.setTo(0.5, 0.9);
        this.physics.arcade.enable(this.ledge);
        this.ledge.enableBody = true;
        this.ledge.body.checkCollision.down = false;
        this.ledge.body.immovable = true;
        this.ledges.add(this.ledge);
        console.log('ledge', i, ' ', this.ledge.x, ', ', this.ledge.y);
        ledgeXPosition = ledgeXPosition + 150;
        if (ledgeYPosition < config.gameHeight - 150 && ledgeYPosition > 150) {
          ledgeYPosition = ledgeYPosition + getRandomInt(-150, 150);
        } else {
          ledgeYPosition = config.gameHeight / 2 + getRandomInt(-150, 150);
        }
      }
    };
    generateLedges();

    //generate ledge and add it to ledge group

    //create player
    this.player = new Player({
      game: this.game,
      x: 150,
      y: 30,
      asset: 'dude',
    });
    this.add.existing(this.player);
    this.player.animations.add('run', [5, 6, 7, 8], 10, true);
    this.player.animations.play('run');
  }

  update() {
    this.physics.arcade.collide(this.player, this.ledges);

    //game over if player falls out of bottom of screen
    if (this.player.position.y > config.gameHeight + 250) {
      this.state.start('Gameover');
    }
  }

  render() {}
}
