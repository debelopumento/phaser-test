import Phaser from 'phaser';
import store from '../store';
import * as actions from '../actions/action_game';
//import * as actions from '../actions/actionIndex';

//import config from '../config';
//import state from '../states/state';
export default class BackgroundAsset extends Phaser.Sprite {
    constructor({ game, x, y, asset }) {
        super(game, x, y, asset);
        //this.anchor.setTo(0, 0);
        this.spriteWidth = this.width;
        //this.anchor.setTo(this.spriteWidth, 0);
        this.anchor.setTo(0, 0);

        console.log(12, 'anchors: ', this.anchor);
        //this.enableBody = true;
        //this.game.physics.arcade.enable(this);
        //this.body.immovable = true;
    }

    update() {
        this.position.x -= 0.5;
        //this.position.z = 1;
        if (this.position.x < -this.spriteWidth) {
            store.dispatch(actions.shouldGenerateBgObject(true));
            this.destroy();
        }
    }
}
