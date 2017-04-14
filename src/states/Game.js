/* globals __DEV__ */
import Phaser from 'phaser';
import ForegroundAsset from '../sprites/foregroundAsset';
import BackdropAsset from '../sprites/backdropAsset';
import BackgroundAsset from '../sprites/backgroundAsset';
import MidgroundAsset from '../sprites/midgroundAsset';
import CloseupAsset from '../sprites/closeupAsset';
import Player from '../sprites/player';
import config from '../config';
import getRandomInt from '../functions/getRandomInt';
import state from './state';
import store from '../store';
import * as actions from '../actions/actionIndex';

const HEIGHT = config.gameHeight;
const WIDTH = config.gameWidth;

export default class GameState extends Phaser.State {
  init() {
    this.speed = state.speed;

    //initialize properties for generating ledges
    let ledgeXPosition = 50;
    let ledgeYPosition = HEIGHT / 2;
    let ledgeIndex = 0;
    let neighbourLedgeHeightDifference = 50;
    const ledgeTypes = ['ledge-1', 'ledge-2', 'ledge-3', 'ledge-4'];

    //add sky
    this.sky = new BackdropAsset({
      game: this,
      width: 500,
      height: 500,
      asset: 'sky',
    });
    this.add.existing(this.sky);

    //add background objects
    this.bg = new BackgroundAsset({
      game: this,
      x: 0,
      y: 100,
      asset: 'bg-1',
    });
    this.add.existing(this.bg);
    this.bg = new BackgroundAsset({
      game: this,
      x: 400,
      y: 100,
      asset: 'bg-2',
    });
    this.add.existing(this.bg);
    this.bg = new BackgroundAsset({
      game: this,
      x: 2800,
      y: 100,
      asset: 'bg-3',
    });
    this.add.existing(this.bg);
    this.bg = new BackgroundAsset({
      game: this,
      x: 1200,
      y: 100,
      asset: 'bg-4',
    });
    this.add.existing(this.bg);
    this.bg = new BackgroundAsset({
      game: this,
      x: 1700,
      y: 100,
      asset: 'bg-5',
    });
    this.add.existing(this.bg);

    //generate midground
    this.mg = new MidgroundAsset({
      game: this,
      x: 0,
      y: 50,
      asset: 'mg-1',
    });
    this.add.existing(this.mg);
    this.mg = new MidgroundAsset({
      game: this,
      x: 800,
      y: 50,
      asset: 'mg-2',
    });
    this.add.existing(this.mg);
    this.mg = new MidgroundAsset({
      game: this,
      x: 1200,
      y: 50,
      asset: 'mg-3',
    });
    this.mg = new MidgroundAsset({
      game: this,
      x: 1600,
      y: 50,
      asset: 'mg-4',
    });
    this.add.existing(this.mg);
    this.add.existing(this.mg);
    //generate ledge and add it to ledge group
    this.generateLedges = () => {
      console.log(
        'ledge',
        ledgeIndex,
        ' ',
        ledgeXPosition,
        ', ',
        JSON.stringify(ledgeYPosition)
      );

      //temperary fix for bug that sometimes y-position of ledge is null
      if (ledgeYPosition === null) {
        ledgeYPosition = HEIGHT / 2;
      }

      const randomLedgeType = ledgeTypes[
        Math.floor(Math.random() * ledgeTypes.length)
      ];
      this.ledge = new ForegroundAsset({
        game: this,
        x: ledgeXPosition,
        y: ledgeYPosition,
        asset: randomLedgeType,
      });
      this.add.existing(this.ledge);
      this.ledge.body.checkCollision.down = false;
      this.ledge.body.checkCollision.left = false;

      this.ledges.add(this.ledge);
      ledgeIndex++;
      //get position for the next ledge to be generated.
      //if positionY is too high then go lower.
      //if positionY is too low then go higher.

      if (ledgeIndex <= 3) {
        ledgeXPosition = ledgeXPosition + 295;
        this.ledge.scale.setTo(0.65, 0.9);
      } else {
        ledgeXPosition = WIDTH + 150;
        this.ledge.scale.setTo(0.5, 1.5);
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
  }
  preload() {}

  create() {
    //create ledge group
    this.ledges = this.add.group();
    this.physics.arcade.enable(this.ledges);
    this.ledges.enableBody = true;

    //generate initial ledges
    for (let i = 0; i <= 3; i++) {
      this.generateLedges();
    }

    //set the rate to generate ledges
    //and generate ledges
    this.ledgeGenerationRate = 1;
    this.game.time.events.loop(
      Phaser.Timer.SECOND * (4 - this.ledgeGenerationRate),
      () => {
        state.speed = Number((state.speed * 1.01).toFixed(3));
        this.generateLedges();
      }
    );

    //create player
    this.player = new Player({
      game: this.game,
      x: 150,
      y: 30,
      asset: 'dude',
    });
    this.add.existing(this.player);

    //create closeup environment
    this.closeup = new CloseupAsset({
      game: this.game,
      y: 300,
      asset: 'closeup-1',
    });
    this.closeup.scale.setTo(2, 1.5);

    this.add.existing(this.closeup);

    //create score
    this.score = this.game.add.text(WIDTH / 2, 30, 'score: 0', {
      font: '32px',
      fill: 'black',
    });
    this.timer = 0;

    this.game.time.events.loop(Phaser.Timer.SECOND * 1, () => {
      this.timer += 100;
      this.score.text = this.timer;
    });
  }

  update() {
    //environment
    //this.sky.position.x -= 0.000001;

    this.physics.arcade.collide(this.player, this.ledges);
    this.ledgeGenerationRate += 0.00213;

    //game over if player falls out of bottom of screen
    if (this.player.position.y > HEIGHT + 250) {
      const guest = store.getState().screenName === 'Guest' ? true : false;
      if (!guest) {
        //check score and update record
        const gameHighestScore = store.getState().gameHighestScore;
        const playerHighestScore = store.getState().playerHighestScore;

        if (this.timer > playerHighestScore) {
          alert('Personal Highest Score!');
          store.dispatch(actions.updatePersonalHighestScore(this.timer));
          if (this.timer > gameHighestScore) {
            alert('Game Highest Score!');
            store.dispatch(actions.checkAndUpdateGameHighestScore(this.timer));
          }
        }
      }

      //go to game over stage
      this.state.start('Gameover');
    }
  }

  render() {}
}
