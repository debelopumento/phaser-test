import Phaser from 'phaser';
import config from '../config';
import store from '../store';
import { connect } from 'react-redux';

export default class Player extends Phaser.Sprite {
    constructor({ game, x, y, asset }) {
        super(game, x, y, asset);
        this.game = game;
        this.anchor.setTo(0, 0);
        game.physics.arcade.enable(this);
        this.body.gravity.y = 980;
        this.body.collideWorldBounds = false;
        this.body.bounce.y = 0.1;
        this.animations.add('run', [1, 2, 3, 2], 12, true);
        this.animations.play('run');
        this.speed = 1;

        if ('webkitSpeechRecognition' in window) {
            const SpeechRecognition = SpeechRecognition ||
                webkitSpeechRecognition;

            //if player's highest score is lower than 300, show tutorial alert
            if (store.getState().playerHighestScore <= 300) {
                alert(`Say 'Jump' or tap / mouse click to make the character jump!`);
            }

            const startSpeechRecognition = () => {
                const speechRecognizer = new SpeechRecognition();
                speechRecognizer.start();
                speechRecognizer.onresult = event => {
                    const transcript = event.results[0][0].transcript;
                    if (transcript === 'jump' || this.body.touching.down) {
                    }
                    this.body.velocity.y = -400;
                    speechRecognizer.stop();
                };
                speechRecognizer.onspeechend = () => {
                    startSpeechRecognition();
                };
                speechRecognizer.onerror = event => {
                    startSpeechRecognition();
                };
            };
            startSpeechRecognition();
        } else {
            alert(
                `Speech Recognition does not support your browser. Please try out the Voice Control function in this game by using Google Chrome on a computer. If you are using Google Chrome on a computer, please upgrade!`
            );
            game.input.onUp.add(() => {
                //only allow player to jump when body is touching the ground
                if (this.body.touching.down) {
                    this.body.velocity.y = -400 + store.getState().speed;
                }
            });
        }
    }

    update() {
        this.speed = store.getState().speed;
    }
}
