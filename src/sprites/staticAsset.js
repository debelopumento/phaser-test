import Phaser from 'phaser';
import getRandomInt from '../functions/getRandomInt';
import config from '../config';

const gameData = $('body').data();

export default class StaticAsset extends Phaser.Sprite {
    constructor({ game, x, y, asset }) {
        super(game, x, y, asset);
        this.anchor.setTo(0, 0);
        this.enableBody = true;
        this.game.physics.arcade.enable(this);
        this.body.immovable = true;
        this.speed = 1;
    }

    update() {
        this.speed = $('body').data('speed');
        this.position.x -= 2 + (this.speed - 1) / 5;
        if (this.position.x < -300) {
            this.kill();
        }
    }
}
