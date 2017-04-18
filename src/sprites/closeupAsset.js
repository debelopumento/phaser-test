import Phaser from 'phaser';
import getRandomInt from '../functions/getRandomInt';
import config from '../config';
import store from '../store';

export default class CloseupAsset extends Phaser.Sprite {
    constructor({ game, x, y, asset }) {
        super(game, x, y, asset);
        this.anchor.setTo(0, 0);
    }

    update() {
        this.position.x -= 2 + store.getState().speed;

        if (this.position.x < -1500) {
            this.position.x = 800;
        }
    }
}
