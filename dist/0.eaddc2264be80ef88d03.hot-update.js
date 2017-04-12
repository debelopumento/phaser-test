webpackHotUpdate(0,{

/***/ 148:
/* unknown exports provided */
/* all exports used */
/*!***************************************!*\
  !*** ./src/functions/getRandomInt.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getRandomInt;
//get random integer between a range, but not 0
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    var result = Math.floor(Math.random() * (max - min + 1)) + min;
    if (result === 0) {
        getRandomInt(min, max);
    } else return result;
}

/***/ }),

/***/ 222:
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

var _phaser = __webpack_require__(/*! phaser */ 41);

var _phaser2 = _interopRequireDefault(_phaser);

var _config = __webpack_require__(/*! ../config */ 76);

var _config2 = _interopRequireDefault(_config);

var _state = __webpack_require__(/*! ../states/state */ 77);

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
            this.speed = $('body').data('speed');
        }
    }]);

    return Player;
}(_phaser2.default.Sprite);

exports.default = Player;

/***/ }),

/***/ 223:
/* unknown exports provided */
/* all exports used */
/*!************************************!*\
  !*** ./src/sprites/staticAsset.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 41);

var _phaser2 = _interopRequireDefault(_phaser);

var _getRandomInt = __webpack_require__(/*! ../functions/getRandomInt */ 148);

var _getRandomInt2 = _interopRequireDefault(_getRandomInt);

var _config = __webpack_require__(/*! ../config */ 76);

var _config2 = _interopRequireDefault(_config);

var _state = __webpack_require__(/*! ../states/state */ 77);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//const gameData = $('body').data();

var StaticAsset = function (_Phaser$Sprite) {
    _inherits(StaticAsset, _Phaser$Sprite);

    function StaticAsset(_ref) {
        var game = _ref.game,
            x = _ref.x,
            y = _ref.y,
            asset = _ref.asset;

        _classCallCheck(this, StaticAsset);

        var _this = _possibleConstructorReturn(this, (StaticAsset.__proto__ || Object.getPrototypeOf(StaticAsset)).call(this, game, x, y, asset));

        _this.anchor.setTo(0, 0);
        _this.enableBody = true;
        _this.game.physics.arcade.enable(_this);
        _this.body.immovable = true;
        //this.speed = state.speed;
        return _this;
    }

    _createClass(StaticAsset, [{
        key: 'update',
        value: function update() {
            //this.speed = $('body').data('speed');
            this.position.x -= 0.3 + _state2.default.speed;
            //this.position.x -= 1.54;

            if (this.position.x < -300) {
                this.kill();
            }
        }
    }]);

    return StaticAsset;
}(_phaser2.default.Sprite);

exports.default = StaticAsset;

/***/ }),

/***/ 224:
/* unknown exports provided */
/* all exports used */
/*!****************************!*\
  !*** ./src/states/Boot.js ***!
  \****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 41);

var _phaser2 = _interopRequireDefault(_phaser);

var _webfontloader = __webpack_require__(/*! webfontloader */ 147);

var _webfontloader2 = _interopRequireDefault(_webfontloader);

var _textButton = __webpack_require__(/*! ../sprites/textButton */ 96);

var _textButton2 = _interopRequireDefault(_textButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BootState = function (_Phaser$State) {
  _inherits(BootState, _Phaser$State);

  function BootState() {
    _classCallCheck(this, BootState);

    return _possibleConstructorReturn(this, (BootState.__proto__ || Object.getPrototypeOf(BootState)).apply(this, arguments));
  }

  _createClass(BootState, [{
    key: 'init',
    value: function init() {
      this.stage.backgroundColor = '#ddd';
      this.fontsReady = false;
      this.fontsLoaded = this.fontsLoaded.bind(this);
    }
  }, {
    key: 'preload',
    value: function preload() {
      _webfontloader2.default.load({
        google: {
          families: ['Bangers']
        },
        active: this.fontsLoaded
      });

      var text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' });
      text.anchor.setTo(0.5, 0.5);

      this.load.image('loaderBg', './assets/images/loader-bg.png');
      this.load.image('loaderBar', './assets/images/loader-bar.png');
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.fontsReady) {
        this.state.start('Splash');
      }
    }
  }, {
    key: 'fontsLoaded',
    value: function fontsLoaded() {
      this.fontsReady = true;
    }
  }]);

  return BootState;
}(_phaser2.default.State);

exports.default = BootState;

/***/ }),

/***/ 225:
/* unknown exports provided */
/* all exports used */
/*!****************************!*\
  !*** ./src/states/Game.js ***!
  \****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 41);

var _phaser2 = _interopRequireDefault(_phaser);

var _staticAsset = __webpack_require__(/*! ../sprites/staticAsset */ 223);

var _staticAsset2 = _interopRequireDefault(_staticAsset);

var _player = __webpack_require__(/*! ../sprites/player */ 222);

var _player2 = _interopRequireDefault(_player);

var _config = __webpack_require__(/*! ../config */ 76);

var _config2 = _interopRequireDefault(_config);

var _getRandomInt = __webpack_require__(/*! ../functions/getRandomInt */ 148);

var _getRandomInt2 = _interopRequireDefault(_getRandomInt);

var _state = __webpack_require__(/*! ./state */ 77);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals __DEV__ */


var HEIGHT = _config2.default.gameHeight;
var WIDTH = _config2.default.gameWidth;

/*
const playerHighestScore = gameData.gameHighestScore !== null
  ? gameData.gamHighestScore
  : 0;
*/
//console.log(40, gameData.gameHighestScore);

var GameState = function (_Phaser$State) {
  _inherits(GameState, _Phaser$State);

  function GameState() {
    _classCallCheck(this, GameState);

    return _possibleConstructorReturn(this, (GameState.__proto__ || Object.getPrototypeOf(GameState)).apply(this, arguments));
  }

  _createClass(GameState, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      this.speed = _state2.default.speed;

      //initial physics in world
      this.physics.startSystem(_phaser2.default.Physics.ARCADE);

      //initialize properties for generating ledges
      var ledgeXPosition = 50;
      var ledgeYPosition = HEIGHT / 2;
      var ledgeIndex = 0;
      var neighbourLedgeHeightDifference = 50;

      //generate ledge and add it to ledge group
      this.generateLedges = function () {
        console.log('ledge', ledgeIndex, ' ', ledgeXPosition, ', ', JSON.stringify(ledgeYPosition));
        _this2.ledge = new _staticAsset2.default({
          game: _this2,
          x: ledgeXPosition,
          y: ledgeYPosition,
          asset: 'platform'
        });
        _this2.add.existing(_this2.ledge);
        _this2.ledge.body.checkCollision.down = false;
        _this2.ledge.body.checkCollision.left = false;
        _this2.ledges.add(_this2.ledge);
        ledgeIndex++;
        //get position for the next ledge to be generated.
        //if positionY is too high then go lower.
        //if positionY is too low then go higher.

        if (ledgeIndex <= 3) {
          ledgeXPosition = ledgeXPosition + 295;
          _this2.ledge.scale.setTo(0.65, 0.9);
        } else {
          ledgeXPosition = WIDTH + 150;
          _this2.ledge.scale.setTo(0.5, 0.9);
        }

        if (ledgeYPosition < HEIGHT - 100 && ledgeYPosition > 100) {
          ledgeYPosition = ledgeYPosition + (0, _getRandomInt2.default)(-neighbourLedgeHeightDifference, neighbourLedgeHeightDifference);
        } else if (ledgeYPosition > HEIGHT - 100) {
          ledgeYPosition = ledgeYPosition + (0, _getRandomInt2.default)(-neighbourLedgeHeightDifference, 0);
        } else {
          ledgeYPosition = ledgeYPosition + (0, _getRandomInt2.default)(0, neighbourLedgeHeightDifference);
        }
      };
    }
  }, {
    key: 'preload',
    value: function preload() {}
  }, {
    key: 'create',
    value: function create() {
      var _this3 = this;

      //create ledge group
      this.ledges = this.add.group();
      this.physics.arcade.enable(this.ledges);
      this.ledges.enableBody = true;

      //generate initial ledges
      for (var i = 0; i <= 3; i++) {
        this.generateLedges();
      }

      //set the rate to generate ledges
      //and generate ledges
      this.ledgeGenerationRate = 1;
      this.game.time.events.loop(_phaser2.default.Timer.SECOND * (2.5 - this.ledgeGenerationRate), function () {
        _state2.default.speed = Number((_state2.default.speed * 1.01).toFixed(3));
        _this3.generateLedges();
      });

      //create player
      this.player = new _player2.default({
        game: this.game,
        x: 150,
        y: 30,
        asset: 'dude'
      });
      this.add.existing(this.player);

      //create score
      this.score = this.game.add.text(WIDTH / 2, 30, 'score: 0', {
        font: '32px',
        fill: 'black'
      });
      this.timer = 0;

      this.game.time.events.loop(_phaser2.default.Timer.SECOND * 1, function () {
        _this3.timer += 100;
        _this3.score.text = 'score: ' + _this3.timer;
        //this.stateb = state.b;
        //console.log(300, this.stateb);
        //$('body').data('speed', this.speed);
        //console.log(20, $('body').data());
      });
    }
  }, {
    key: 'update',
    value: function update() {
      this.physics.arcade.collide(this.player, this.ledges);
      this.ledgeGenerationRate += 0.00213;

      //game over if player falls out of bottom of screen
      if (this.player.position.y > HEIGHT + 250) {
        //check score
        if (this.timer > _state2.default.gameHighestScore) {
          var SERVER = 'http://localhost:8080/';
          $.ajax({
            url: SERVER + 'highestScore'
          });
        }
        //go to game over stage
        this.state.start('Gameover');
      }
    }
  }, {
    key: 'render',
    value: function render() {}
  }]);

  return GameState;
}(_phaser2.default.State);

exports.default = GameState;

/***/ }),

/***/ 226:
/* unknown exports provided */
/* all exports used */
/*!********************************!*\
  !*** ./src/states/Gameover.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 41);

var _phaser2 = _interopRequireDefault(_phaser);

var _textButton = __webpack_require__(/*! ../sprites/textButton */ 96);

var _textButton2 = _interopRequireDefault(_textButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameoverState = function (_Phaser$State) {
  _inherits(GameoverState, _Phaser$State);

  function GameoverState() {
    _classCallCheck(this, GameoverState);

    return _possibleConstructorReturn(this, (GameoverState.__proto__ || Object.getPrototypeOf(GameoverState)).apply(this, arguments));
  }

  _createClass(GameoverState, [{
    key: 'init',
    value: function init() {}
  }, {
    key: 'preload',
    value: function preload() {}
  }, {
    key: 'create',
    value: function create() {
      var _this2 = this;

      this.start = new _textButton2.default({
        game: this.game,
        x: this.game.world.centerX,
        y: this.game.world.centerY,
        asset: 'button'
      });

      this.add.existing(this.start);

      this.start.onInputDown.add(function () {
        _this2.state.start('Game');
      });
    }
  }]);

  return GameoverState;
}(_phaser2.default.State);

exports.default = GameoverState;

/***/ }),

/***/ 227:
/* unknown exports provided */
/* all exports used */
/*!******************************!*\
  !*** ./src/states/Splash.js ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 41);

var _phaser2 = _interopRequireDefault(_phaser);

var _utils = __webpack_require__(/*! ../utils */ 229);

var _textButton = __webpack_require__(/*! ../sprites/textButton */ 96);

var _textButton2 = _interopRequireDefault(_textButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SplashState = function (_Phaser$State) {
  _inherits(SplashState, _Phaser$State);

  function SplashState() {
    _classCallCheck(this, SplashState);

    return _possibleConstructorReturn(this, (SplashState.__proto__ || Object.getPrototypeOf(SplashState)).apply(this, arguments));
  }

  _createClass(SplashState, [{
    key: 'init',
    value: function init() {}
  }, {
    key: 'preload',
    value: function preload() {
      //this.load.setPreloadSprite(this.loaderBar);
      this.load.image('sky', 'assets/images/sky.png');
      this.load.image('star', 'assets/images/star.png');
      this.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
      this.load.image('mushroom', 'assets/images/mushroom2.png');
      this.load.image('platform', 'assets/images/platform.png');
      this.load.image('button', 'assets/images/button.png', 40, 10, 3);
    }
  }, {
    key: 'create',
    value: function create() {
      this.start = new _textButton2.default({
        game: this.game,
        x: this.game.world.centerX,
        y: this.game.world.centerY,
        label: 'play',
        asset: 'button',
        style: {
          font: '64px',
          fill: 'white'
        }
      });
      this.start.scale.setTo(0.7, 0.7);
      this.add.existing(this.start);
      this.start.onInputDown.add(function () {
        //this.state.start('Game');
      });
      this.state.start('Game');
    }
  }]);

  return SplashState;
}(_phaser2.default.State);

exports.default = SplashState;

/***/ }),

/***/ 229:
/* unknown exports provided */
/* all exports used */
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var centerGameObjects = exports.centerGameObjects = function centerGameObjects(objects) {
    objects.forEach(function (object) {
        object.anchor.setTo(0.5);
    });
};

/***/ }),

/***/ 551:
/* unknown exports provided */
/* all exports used */
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ 75);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(/*! react-dom */ 146);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = __webpack_require__(/*! react-redux */ 518);

var _store = __webpack_require__(/*! ./store */ 228);

var _store2 = _interopRequireDefault(_store);

var _game_main = __webpack_require__(/*! ./game_main */ 552);

var _game_main2 = _interopRequireDefault(_game_main);

var _state = __webpack_require__(/*! ./states/state */ 77);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*global fb*/

var SERVER = 'http://localhost:8080/';
var facebookLogIn = function facebookLogIn() {
    // This is called with the results from from FB.getLoginStatus().
    window.fbAsyncInit = function () {
        FB.init({
            appId: '113731382506643',
            cookie: true, // enable cookies to allow the server to access
            // the session
            xfbml: true, // parse social plugins on this page
            version: 'v2.8' });

        FB.getLoginStatus(function (response) {
            //statusChangeCallback(response);
            if (response.status === 'connected') {
                FB.api('/me', function (response) {
                    var signedInUserFacebookId = response.id;
                    playerSignin(signedInUserFacebookId);
                });
            }
        });
    };

    // Load the SDK asynchronously
    (function (d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
};

var startGame = function startGame() {
    $('#signinScreen').css('display', 'none');
    $.ajax({
        url: SERVER + 'highestScore',
        type: 'GET',
        success: function success(data) {
            _state2.default.gameHighestScore = data.result[0].highestScore;
            //$('body').data('gameHighestScore', gameHighestScore);
            var game = new _game_main2.default();
        },
        error: function error(e) {
            console.log(e);
        }
    });
};

var playerSignin = function playerSignin(facebookId) {
    //this ajax call checks if this is a first time player
    $.ajax({
        url: SERVER + 'users/facebookId/' + facebookId,
        type: 'GET',
        success: function success(data) {
            if (data.length === 0) {
                var register = '';
                register += '<p>Please enter a screen name</p>';
                register += '<input id="inputScreenName" type="text" />';
                register += '<button id="js-submitScreenName" type="submit">submit</button>';
                $('#signinScreen').append(register);
                $('#js-submitScreenName').click(function () {
                    var newPlayer = {
                        facebookId: facebookId,
                        screenName: $('#inputScreenName').val()
                    };
                    $.ajax({
                        url: SERVER + 'users/',
                        type: 'POST',
                        contentType: 'application/json; charset=utf-8',
                        data: JSON.stringify(newPlayer),
                        success: function success(player) {
                            _state2.default.playerData = player;
                            console.log(2);
                            startGame();
                        },
                        error: function error(e) {
                            console.log(e);
                        }
                    });
                });
            } else {
                startGame();
            }
        },
        error: function error(e) {
            console.log(e);
        }
    });
};

var App = function (_PureComponent) {
    _inherits(App, _PureComponent);

    function App() {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

        _this.playAsAGuest = _this.playAsAGuest.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: 'playAsAGuest',
        value: function playAsAGuest(event) {
            event.preventDefault();
            var guestPlayer = {
                highestScore: 0,
                screenName: 'Guest'
            };
            startGame();
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            facebookLogIn();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement('input', {
                    type: 'submit',
                    value: 'play as a Guest',
                    onClick: this.playAsAGuest
                })
            );
        }
    }]);

    return App;
}(_react.PureComponent);

/***/ }),

/***/ 552:
/* unknown exports provided */
/* all exports used */
/*!**************************!*\
  !*** ./src/game_main.js ***!
  \**************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

__webpack_require__(/*! pixi */ 144);

__webpack_require__(/*! p2 */ 145);

var _phaser = __webpack_require__(/*! phaser */ 41);

var _phaser2 = _interopRequireDefault(_phaser);

var _Boot = __webpack_require__(/*! ./states/Boot */ 224);

var _Boot2 = _interopRequireDefault(_Boot);

var _Splash = __webpack_require__(/*! ./states/Splash */ 227);

var _Splash2 = _interopRequireDefault(_Splash);

var _Game = __webpack_require__(/*! ./states/Game */ 225);

var _Game2 = _interopRequireDefault(_Game);

var _Gameover = __webpack_require__(/*! ./states/Gameover */ 226);

var _Gameover2 = _interopRequireDefault(_Gameover);

var _config = __webpack_require__(/*! ./config */ 76);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Game = function (_Phaser$Game) {
    _inherits(Game, _Phaser$Game);

    function Game() {
        _classCallCheck(this, Game);

        var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, _config2.default.gameWidth, _config2.default.gameHeight, _phaser2.default.CANVAS, 'game', null));

        _this.state.add('Boot', _Boot2.default, false);
        _this.state.add('Splash', _Splash2.default, false);
        _this.state.add('Game', _Game2.default, false);
        _this.state.add('Gameover', _Gameover2.default, false);

        _this.state.start('Boot');
        return _this;
    }

    return Game;
}(_phaser2.default.Game);

//window.game = new Game();


exports.default = Game;

/***/ }),

/***/ 76:
/* unknown exports provided */
/* all exports used */
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var maxWidth = 760;
var maxHeight = 414;
var docElement = document.documentElement;
var width = docElement.clientWidth > maxWidth ? maxWidth : docElement.clientWidth;
var height = docElement.clientHeight > maxHeight ? maxHeight : docElement.clientHeight;

exports.default = {
    gameWidth: width,
    gameHeight: height,
    localStorageName: 'phaseres6webpack'
};

/***/ }),

/***/ 77:
/* unknown exports provided */
/* all exports used */
/*!*****************************!*\
  !*** ./src/states/state.js ***!
  \*****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    gameHighestScore: 1,
    playerData: {},
    speed: 1
};

/***/ }),

/***/ 96:
/* unknown exports provided */
/* all exports used */
/*!***********************************!*\
  !*** ./src/sprites/textButton.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextButton = function (_Phaser$Button) {
    _inherits(TextButton, _Phaser$Button);

    function TextButton(_ref) {
        var game = _ref.game,
            x = _ref.x,
            y = _ref.y,
            asset = _ref.asset,
            callback = _ref.callback,
            callbackContext = _ref.callbackContext,
            overFrame = _ref.overFrame,
            outFrame = _ref.outFrame,
            downFrame = _ref.downFrame,
            upFrame = _ref.upFrame,
            label = _ref.label,
            style = _ref.style;

        _classCallCheck(this, TextButton);

        var _this = _possibleConstructorReturn(this, (TextButton.__proto__ || Object.getPrototypeOf(TextButton)).call(this, game, x, y, asset, callback, callbackContext, overFrame, outFrame, downFrame, upFrame));

        _this.anchor.setTo(0.5);

        _this.label = label;
        _this.style = style;
        _this.text = new Phaser.Text(_this.game, 0, 0, _this.label, _this.style);
        _this.text.anchor.setTo(0.5);

        _this.addChild(_this.text);
        return _this;
    }

    return TextButton;
}(Phaser.Button);

exports.default = TextButton;

/***/ })

})
//# sourceMappingURL=0.eaddc2264be80ef88d03.hot-update.js.map