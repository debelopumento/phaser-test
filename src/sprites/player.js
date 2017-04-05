import Phaser from 'phaser';

export default class Player extends Phaser.Sprite {
    constructor({ game, x, y, asset }) {
        super(game, x, y, asset);
        this.game = game;
        this.anchor.setTo(0, 0);
        game.physics.arcade.enable(this);
        //this.animations.add('run', [5, 6, 7, 8], 10, true);
        game.input.onUp.add(() => {
            this.position.y -= 100;
        });

        const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

        function startSpeechRecognition() {
            const speechRecognizer = new SpeechRecognition();
            speechRecognizer.start();
            console.log('i am ready. say something.');
            speechRecognizer.onresult = function(event) {
                const transcript = event.results[0][0].transcript;
                if (transcript === 'jump') {
                    console.log(1, transcript);
                }
                //this.position.y -= 100;
                speechRecognizer.stop();
            };
            speechRecognizer.onspeechend = function() {
                console.log('say some more');
                startSpeechRecognition();
            };
            speechRecognizer.onerror = function(event) {
                console.log(400, 'error!!');
                startSpeechRecognition();
            };
        }

        if ('webkitSpeechRecognition' in window) {
            startSpeechRecognition();
        } else {
            alert(
                'Your browser is not supported. If you are using google chrome, please upgrade!'
            );
        }
    }

    update() {
        //this.angle += 1;
        //this.position.x += 1;
    }
}
