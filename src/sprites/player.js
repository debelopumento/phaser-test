import Phaser from 'phaser';
import config from '../config';
export default class Player extends Phaser.Sprite {
    constructor({ game, x, y, asset }) {
        super(game, x, y, asset);
        this.game = game;
        this.anchor.setTo(0, 0);
        game.physics.arcade.enable(this);
        this.body.gravity.y = 980;
        this.body.collideWorldBounds = false;
        this.body.bounce.y = 0.1;

        this.animations.add('run', [5, 6, 7, 8], 10, true);
        this.animations.play('run');

        this.speed = 1;
        game.input.onUp.add(() => {
            //this.body.velocity.y = -400 / Math.sqrt(this.speed);
            this.body.velocity.y = -400;
        });

        const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

        const startSpeechRecognition = () => {
            const speechRecognizer = new SpeechRecognition();
            speechRecognizer.start();
            //console.log('i am ready. say something.');
            speechRecognizer.onresult = event => {
                const transcript = event.results[0][0].transcript;
                if (transcript === 'jump') {
                    console.log(1, transcript);
                }
                this.body.velocity.y = -400;
                speechRecognizer.stop();
            };
            speechRecognizer.onspeechend = () => {
                //console.log('say some more');
                startSpeechRecognition();
            };
            speechRecognizer.onerror = event => {
                //console.log(400, 'error!!');
                startSpeechRecognition();
            };
        };

        if ('webkitSpeechRecognition' in window) {
            startSpeechRecognition();
        } else {
            alert(
                'Your browser is not supported. If you are using google chrome, please upgrade!'
            );
        }
    }

    update() {
        this.speed = $('body').data('speed');
    }
}
