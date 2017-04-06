import Phaser from 'phaser';
import getRandomInt from '../functions/getRandomInt';
import config from '../config';

export default class StaticAsset extends Phaser.Sprite {
    constructor({ game, x, y, asset }) {
        super(game, x, y, asset);
        this.anchor.setTo(0, 0);
    }

    update() {
        //this.angle += 1;
        this.position.x -= 2.5;

        if (this.position.x < -200) {
            //this.kill();
            this.position.x = config.gameWidth + 100;
            if (this.position.y < config.gameHeight - 200) {
                this.position.y = this.position.y + getRandomInt(-150, 150);
            } else {
                this.position.y = config.gameHeight / 2 + getRandomInt(-50, 50);
            }
        }
    }
}
