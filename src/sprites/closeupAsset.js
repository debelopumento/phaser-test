import Phaser from 'phaser';
import getRandomInt from '../functions/getRandomInt';
import config from '../config';
import state from '../states/state';

export default class CloseupAsset extends Phaser.Sprite {
    constructor({ game, x, y, asset }) {
        super(game, x, y, asset);
        this.anchor.setTo(0, 0);
    }

    update() {
        this.position.x -= 2 + state.speed;

        if (this.position.x < -1500) {
            this.position.x = 800;
        }
    }
}
