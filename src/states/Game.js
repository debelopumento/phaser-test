/* globals __DEV__ */
import Phaser from 'phaser';
import StaticAsset from '../sprites/staticAsset';
import Player from '../sprites/player';
import config from '../config';
import getRandomInt from '../functions/getRandomInt';

const HEIGHT = config.gameHeight;
const WIDTH = config.gameWidth;
export default class GameState extends Phaser.State {
  init() {}
  preload() {}

  create() {
    //initial physics in world
    this.physics.startSystem(Phaser.Physics.ARCADE);

    //this.add.sprite(0, 0, 'star');

    //create ledge group
    this.ledges = this.add.group();
    this.physics.arcade.enable(this.ledges);
    this.ledges.enableBody = true;
    //initialize properties for generating ledges
    let ledgeXPosition = 50;
    let ledgeYPosition = config.gameHeight / 2;
    let ledgeIndex = 0;
    let neighbourLedgeHeightDifference = 50;
    let array = [-80, -60, 60, 80];

    //generate ledge and add it to ledge group
    const generateLedges = () => {
      this.ledge = new StaticAsset({
        game: this,
        x: ledgeXPosition,
        y: ledgeYPosition,
        asset: 'platform',
      });
      this.add.existing(this.ledge);
      this.ledge.body.checkCollision.down = false;
      this.ledge.body.checkCollision.left = false;

      this.ledges.add(this.ledge);
      console.log('ledge', ledgeIndex, ' ', this.ledge.x, ', ', this.ledge.y);
      ledgeIndex++;
      //get position for the next ledge to be generated.
      //if positionY is too high then go lower.
      //if positionY is too low then go higher.

      if (ledgeIndex <= 3) {
        ledgeXPosition = ledgeXPosition + 230;
        this.ledge.scale.setTo(0.6, 0.9);
      } else {
        ledgeXPosition = WIDTH + 150;
        this.ledge.scale.setTo(0.5, 0.9);
      }

      //ledgeXPosition = WIDTH + 150;

      if (ledgeYPosition < HEIGHT - 100 && ledgeYPosition > 100) {
        ledgeYPosition = ledgeYPosition +
          getRandomInt(
            -neighbourLedgeHeightDifference,
            neighbourLedgeHeightDifference
          );
      } else if (ledgeYPosition > HEIGHT - 100) {
        ledgeYPosition = ledgeYPosition +
          getRandomInt(-neighbourLedgeHeightDifference, 0);
      } else {
        ledgeYPosition = ledgeYPosition +
          getRandomInt(0, neighbourLedgeHeightDifference);
      }
    };

    for (let i = 0; i <= 4; i++) {
      generateLedges();
    }

    setInterval(
      function() {
        generateLedges();
      },
      2200
    );

    //create player
    this.player = new Player({
      game: this.game,
      x: 150,
      y: 30,
      asset: 'dude',
    });
    this.add.existing(this.player);
  }

  update() {
    this.physics.arcade.collide(this.player, this.ledges);
    //game over if player falls out of bottom of screen
    if (this.player.position.y > HEIGHT + 250) {
      this.state.start('Gameover');
    }
  }

  render() {}
}
