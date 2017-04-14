import Phaser from 'phaser';
//import getRandomInt from '../functions/getRandomInt';
//import config from '../config';
//import state from '../states/state';

export default class MidgroundAsset extends Phaser.Sprite {
    constructor({ game, x, y, asset }) {
        super(game, x, y, asset);
        this.anchor.setTo(0, 0);
        //this.enableBody = true;
        //this.game.physics.arcade.enable(this);
        //this.body.immovable = true;
    }

    update() {
        this.position.x -= 0.6;
        /*
        if (this.position.x < -300) {
            this.kill();
        }
        */
    }
}
