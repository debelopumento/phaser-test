import Phaser from 'phaser';
import store from '../store';
import * as gameActions from '../actions/action_game';

export default class MidgroundAsset extends Phaser.Sprite {
    constructor({ game, x, y, asset }) {
        super(game, x, y, asset);
        this.spriteWidth = this.width;
        this.anchor.setTo(0, 0);
    }

    update() {
        this.position.x -= 0.6;

        if (this.position.x < -this.spriteWidth) {
            store.dispatch(gameActions.shouldGenerateMgObject(true));
            this.destroy();
        }
    }
}
