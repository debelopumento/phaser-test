import Phaser from 'phaser';
import TextButton from '../sprites/textButton';

export default class GameoverState extends Phaser.State {
  create() {
    this.start = new TextButton({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY,
      asset: 'button',
    });

    this.add.existing(this.start);
    this.start.onInputDown.add(() => {
      this.state.start('Game');
    });
  }
}
