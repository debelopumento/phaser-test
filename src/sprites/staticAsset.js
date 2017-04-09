import Phaser from 'phaser';
import getRandomInt from '../functions/getRandomInt';
import config from '../config';

export default class StaticAsset extends Phaser.Sprite {
    constructor({ game, x, y, asset }) {
        super(game, x, y, asset);
        this.anchor.setTo(0, 0);
        this.enableBody = true;
        this.game.physics.arcade.enable(this);
        this.body.immovable = true;
        this.speed = 2;
        //this.speedFactor = 1;
    }

    update() {
        this.position.x -= this.speed;
        if (this.position.x < -300) {
            this.kill();
        }
    }
}
