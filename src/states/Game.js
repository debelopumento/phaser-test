/* globals __DEV__ */
import Phaser from 'phaser';
import StaticAsset from '../sprites/staticAsset';
import Player from '../sprites/player';
import config from '../config';
import getRandomInt from '../functions/getRandomInt';

const HEIGHT = config.gameHeight;
const WIDTH = config.gameWidth;
const gameData = $('body').data();
console.log(19, gameData);
/*
const playerHighestScore = gameData.playerData.highestScore !== null
  ? gameData.playerData.highestScore
  : 0;

*/
export default class GameState extends Phaser.State {
  init() {}
  preload() {}

  create() {
    this.speed = 1;
    console.log(51, gameData);
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
      this.ledge.speed = 2 * this.speed;
      this.ledges.add(this.ledge);

      console.log('ledge', ledgeIndex, ' ', this.ledge.x, ', ', this.ledge.y);
      ledgeIndex++;
      //get position for the next ledge to be generated.
      //if positionY is too high then go lower.
      //if positionY is too low then go higher.
      if (ledgeIndex <= 3) {
        ledgeXPosition = ledgeXPosition + 295;
        this.ledge.scale.setTo(0.65, 0.9);
      } else {
        ledgeXPosition = WIDTH + 150;
        this.ledge.scale.setTo(0.5, 0.9);
      }

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

    //generate initial ledges
    for (let i = 0; i <= 3; i++) {
      generateLedges();
    }

    //set the rate to generate ledges
    //and generate ledges
    this.abc = 1;
    let ledgeGenerationRate = 1;
    this.game.time.events.loop(Phaser.Timer.SECOND * (2.8 - this.abc), () => {
      console.log(9, this.abc);
      generateLedges();
    });

    //create player
    this.player = new Player({
      game: this.game,
      x: 150,
      y: 30,
      asset: 'dude',
    });
    this.add.existing(this.player);

    //create timer

    this.score = this.game.add.text(WIDTH / 2, 30, 'score: 0', {
      font: '32px',
      fill: 'black',
    });
    let timer = 0;

    this.game.time.events.loop(Phaser.Timer.SECOND * 1, () => {
      timer += 100;
      this.score.text = 'score: ' + timer;
      this.speed = this.speed * 1.03;
      ledgeGenerationRate = ledgeGenerationRate * 2;
      $('body').data('speed', this.speed);
      console.log(20, $('body').data());
    });
  }

  update() {
    this.physics.arcade.collide(this.player, this.ledges);
    this.abc += 0.00013;
    //game over if player falls out of bottom of screen
    if (this.player.position.y > HEIGHT + 250) {
      this.state.start('Gameover');
    }
  }

  render() {}
}
