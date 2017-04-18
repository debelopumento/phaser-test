import Phaser from 'phaser';
import getRandomInt from '../functions/getRandomInt';
import config from '../config';
import store from '../store';

export default class ForegroundAsset extends Phaser.Sprite {
    constructor({ game, x, y, asset }) {
        super(game, x, y, asset);
        this.anchor.setTo(0, 0);
        this.enableBody = true;
        this.game.physics.arcade.enable(this);
        this.body.immovable = true;
    }

    update() {
        this.speed = store.getState().speed;
        this.position.x -= 0.3 + this.speed;
        if (this.position.x < -300) {
            this.destroy();
        }
    }
}
