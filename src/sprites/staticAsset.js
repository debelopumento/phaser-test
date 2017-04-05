import Phaser from 'phaser';

export default class StaticAsset extends Phaser.Sprite {
    constructor({ game, x, y, asset }) {
        super(game, x, y, asset);
        this.anchor.setTo(0, 0);
    }

    update() {
        //this.angle += 1;
        this.position.x -= 2.5;

        //generate a random integer between two values
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max = min)) + min;
        }

        if (this.position.x < -300) {
            //this.kill();
            this.position.x = 800;
            this.position.y = getRandomInt(150, 250);
        }
    }
}
