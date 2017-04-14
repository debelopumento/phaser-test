import Phaser from 'phaser';
import { centerGameObjects } from '../utils';
import TextButton from '../sprites/textButton';

export default class SplashState extends Phaser.State {
  init() {}

  preload() {
    //this.load.setPreloadSprite(this.loaderBar);
    this.load.image('sky', 'assets/images/sky.png');
    this.load.image('star', 'assets/images/star.png');
    this.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
    this.load.image('mushroom', 'assets/images/mushroom2.png');
    this.load.image('platform', 'assets/images/platform.png');
    this.load.image('platform-b', 'assets/images/platform-b.png');
    this.load.image('bg-1', 'assets/images/tobu-bg-1.png');
    this.load.image('bg-2', 'assets/images/tobu-bg-2.png');
    this.load.image('bg-3', 'assets/images/tobu-bg-3.png');
    this.load.image('bg-4', 'assets/images/tobu-bg-4.png');
    this.load.image('bg-5', 'assets/images/tobu-bg-5.png');

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
