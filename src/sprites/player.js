import Phaser from 'phaser';

export default class extends Phaser.Sprite {
    constructor({ game, x, y, asset }) {
        super(game, x, y, asset);
        this.anchor.setTo(0, 0);
        this.game.input.onUp.add(() => {
            this.position.y -= 100;
        });

        const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

        function startConverting() {
            if ('webkitSpeechRecognition' in window) {
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
                    startConverting();
                };
                speechRecognizer.onerror = function(event) {
                    console.log(400, 'error!!');
                    startConverting();
                };
            } else {
                alert(
                    'Your browser is not supported. If you are using google chrome, please upgrade!'
                );
            }
        }
        startConverting();
    }

    update() {
        //this.angle += 1;
        //this.position.x += 1;
    }
}
