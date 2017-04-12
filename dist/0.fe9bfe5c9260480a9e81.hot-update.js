webpackHotUpdate(0,{

/***/ 252:
/* unknown exports provided */
/* all exports used */
/*!*******************************!*\
  !*** ./src/sprites/player.js ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 42);

var _phaser2 = _interopRequireDefault(_phaser);

var _config = __webpack_require__(/*! ../config */ 77);

var _config2 = _interopRequireDefault(_config);

var _state = __webpack_require__(/*! ../states/state */ 78);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//console.log(19, state);

var Player = function (_Phaser$Sprite) {
    _inherits(Player, _Phaser$Sprite);

    function Player(_ref) {
        var game = _ref.game,
            x = _ref.x,
            y = _ref.y,
            asset = _ref.asset;

        _classCallCheck(this, Player);

        var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, game, x, y, asset));

        _this.game = game;
        _this.anchor.setTo(0, 0);
        game.physics.arcade.enable(_this);
        _this.body.gravity.y = 980;
        _this.body.collideWorldBounds = false;
        _this.body.bounce.y = 0.1;

        _this.animations.add('run', [5, 6, 7, 8], 6, true);
        _this.animations.play('run');

        _this.speed = 1;
        game.input.onUp.add(function () {
            //this.body.velocity.y = -400 / Math.sqrt(this.speed);
            _this.body.velocity.y = -400 + _state2.default.speed;
        });

        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

        var startSpeechRecognition = function startSpeechRecognition() {
            var speechRecognizer = new SpeechRecognition();
            speechRecognizer.start();
            speechRecognizer.onresult = function (event) {
                var transcript = event.results[0][0].transcript;
                if (transcript === 'jump') {
                    console.log(1, transcript);
                }
                _this.body.velocity.y = -400;
                speechRecognizer.stop();
            };
            speechRecognizer.onspeechend = function () {
                //console.log('say some more');
                startSpeechRecognition();
            };
            speechRecognizer.onerror = function (event) {
                //console.log(400, 'error!!');
                startSpeechRecognition();
            };
        };

        if ('webkitSpeechRecognition' in window) {
            startSpeechRecognition();
        } else {
            alert('Your browser is not supported. If you are using google chrome, please upgrade!');
        }
        return _this;
    }

    _createClass(Player, [{
        key: 'update',
        value: function update() {
            this.speed = _state2.default.speed;
        }
    }]);

    return Player;
}(_phaser2.default.Sprite);

exports.default = Player;

/***/ })

})
//# sourceMappingURL=0.fe9bfe5c9260480a9e81.hot-update.js.map