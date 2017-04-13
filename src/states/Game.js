/* globals __DEV__ */
import Phaser from 'phaser';
import StaticAsset from '../sprites/staticAsset';
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

    //initial physics in world
    this.physics.startSystem(Phaser.Physics.ARCADE);

    //initialize properties for generating ledges
    let ledgeXPosition = 50;
    let ledgeYPosition = HEIGHT / 2;
    let ledgeIndex = 0;
    let neighbourLedgeHeightDifference = 50;

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
      Phaser.Timer.SECOND * (2.5 - this.ledgeGenerationRate),
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

    //create score
    this.score = this.game.add.text(WIDTH / 2, 30, 'score: 0', {
      font: '32px',
      fill: 'black',
    });
    this.timer = 0;

    this.game.time.events.loop(Phaser.Timer.SECOND * 1, () => {
      this.timer += 100;
      this.score.text = 'score: ' + this.timer;
    });
  }

  update() {
    this.physics.arcade.collide(this.player, this.ledges);
    this.ledgeGenerationRate += 0.00213;

    //game over if player falls out of bottom of screen
    if (this.player.position.y > HEIGHT + 250) {
      const guest = store.getState().screenName === 'Guest' ? true : false;
      console.log(0, guest);
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
