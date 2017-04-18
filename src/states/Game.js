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
import * as gameActions from '../actions/action_game';

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
    ///5 different types of bg objects
    this.bgObjectTypes = [
      { x: WIDTH + 100, y: 100, asset: 'bg-1' },
      { x: WIDTH + 400, y: 200, asset: 'bg-2' },
      { x: WIDTH + 400, y: 100, asset: 'bg-3' },
      { x: WIDTH + 300, y: 100, asset: 'bg-4' },
      { x: WIDTH + 200, y: 100, asset: 'bg-5' },
    ];
    this.bgObjects = this.add.group();
    this.generateBgObject = bgObjectType => {
      this.bg = new BackgroundAsset({
        game: this,
        x: bgObjectType.x,
        y: bgObjectType.y,
        asset: bgObjectType.asset,
      });
      this.add.existing(this.bg);
      this.bgObjects.add(this.bg);
      store.dispatch(gameActions.shouldGenerateBgObject(false));
    };
    ///generate 2 initial bg mountians
    this.generateBgObject({ x: 200, y: 100, asset: 'bg-1' });
    this.generateBgObject({ x: 600, y: 200, asset: 'bg-2' });

    //generate midground
    this.mgObjectTypes = [
      { x: WIDTH + 200, y: 50, asset: 'mg-1' },
      { x: WIDTH + 200, y: 50, asset: 'mg-2' },
      { x: WIDTH + 200, y: 50, asset: 'mg-3' },
      { x: WIDTH + 200, y: 50, asset: 'mg-4' },
    ];
    this.mgObjects = this.add.group();
    this.generateMgObject = mgObjectType => {
      this.mg = new MidgroundAsset({
        game: this,
        x: mgObjectType.x,
        y: mgObjectType.y,
        asset: mgObjectType.asset,
      });
      this.add.existing(this.mg);
      this.mgObjects.add(this.mg);
      console.log('generated mg object: 123', this.mg.x, this.mg.y);
      store.dispatch(gameActions.shouldGenerateMgObject(false));
    };
    this.generateMgObject({ x: 0, y: 50, asset: 'mg-1' });
    this.generateMgObject({ x: 800, y: 50, asset: 'mg-2' });

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

      if (ledgeYPosition < HEIGHT - 100 && ledgeYPosition > 150) {
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
    const closeupObjects = [
      { x: 0, y: 300, asset: 'closeup-1', scaleX: '2', scaleY: '1.5' },
      { x: 1000, y: 300, asset: 'closeup-1', scaleX: '1.5', scaleY: '1.5' },
      { x: 1500, y: 300, asset: 'closeup-1', scaleX: '2.2', scaleY: '1.5' },
      { x: 0, y: -20, asset: 'closeup-2', scaleX: '2.2', scaleY: '0.5' },
      { x: 800, y: -20, asset: 'closeup-2', scaleX: '2.2', scaleY: '0.8' },
    ];

    closeupObjects.forEach(obj => {
      this.closeup = new CloseupAsset({
        game: this.game,
        x: obj.x,
        y: obj.y,
        asset: obj.asset,
      });
      this.closeup.scale.setTo(obj.scaleX, obj.scaleY);
      this.add.existing(this.closeup);
    });

    //create score
    this.score = this.game.add.text(WIDTH / 2, 30, '0', {
      font: '25px',
      fill: 'white',
    });
    this.timer = 0;

    this.game.time.events.loop(Phaser.Timer.SECOND * 1, () => {
      this.timer += 100;
      this.score.text = this.timer;
    });
  }

  update() {
    //environment
    this.physics.arcade.collide(this.player, this.ledges);
    this.ledgeGenerationRate += 0.00213;

    //when store returns true for shouldGenerateBgObject, get a random bg objectd type and call the function for generating it
    if (store.getState().shouldGenerateBgObject === true) {
      this.randomBgObjectType = this.bgObjectTypes[
        Math.floor(Math.random() * this.bgObjectTypes.length)
      ];
      this.generateBgObject(this.randomBgObjectType);
    }
    if (store.getState().shouldGenerateMgObject === true) {
      this.randomMgObjectType = this.mgObjectTypes[
        Math.floor(Math.random() * this.mgObjectTypes.length)
      ];
      this.generateMgObject(this.randomMgObjectType);
    }

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

  render() {
    this.game.debug.text('player z-depth: ' + this.player.z, 10, 20);
    this.game.debug.text('bg z-depth: ' + this.bg.z, 10, 40);
    this.game.debug.text('ledges z-depth: ' + this.ledges.z, 10, 60);
    this.game.debug.text('backdrop z-depth: ' + this.sky.z, 10, 80);
    this.game.debug.text('closeup z-depth: ' + this.closeup.z, 10, 100);
    this.game.debug.text('bg objects: ' + this.bgObjects.z, 10, 120);
  }
}
