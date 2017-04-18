import Phaser from 'phaser';
import { centerGameObjects } from '../utils';
import TextButton from '../sprites/textButton';

export default class SplashState extends Phaser.State {
  init() {}

  preload() {
    //this.load.setPreloadSprite(this.loaderBar);
    const assets = [
      'sky',
      'dude',
      'ledge-1',
      'ledge-2',
      'ledge-3',
      'ledge-4',
      'bg-1',
      'bg-2',
      'bg-3',
      'bg-4',
      'bg-5',
      'mg-1',
      'mg-2',
      'mg-3',
      'mg-4',
      'closeup-1',
      'closeup-2',
    ];

    assets.forEach(asset => {
      const path = 'assets/images/' + asset + '.png';
      this.load.image(asset, path);
    });
    this.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
    this.load.image('button', 'assets/images/button.png', 40, 10, 3);
  }

  create() {
    this.start = new TextButton({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY,
      label: 'play',
      asset: 'button',
      style: {
        font: '64px',
        fill: 'white',
      },
    });
    this.start.scale.setTo(0.7, 0.7);
    this.add.existing(this.start);
    this.start.onInputDown.add(() => {
      //this.state.start('Game');
    });
    this.state.start('Game');
  }
}
