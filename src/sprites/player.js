import Phaser from 'phaser';

export default class extends Phaser.Sprite {
    constructor({ game, x, y, asset }) {
        super(game, x, y, asset);
        this.anchor.setTo(0, 0);
        //this.position.y += 200;
        this.game.input.onUp.add(() => {
            this.position.y -= 150;
        });
    }

    update() {
        //this.angle += 1;
        //this.position.x += 1;
    }
}
