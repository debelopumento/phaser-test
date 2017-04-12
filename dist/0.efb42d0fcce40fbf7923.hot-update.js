webpackHotUpdate(0,{

/***/ 248:
/* unknown exports provided */
/* all exports used */
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ 60);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ 129);

var _reactDom = __webpack_require__(/*! react-dom */ 98);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = __webpack_require__(/*! react-redux */ 218);

var _store = __webpack_require__(/*! ./store */ 79);

var _store2 = _interopRequireDefault(_store);

var _game_main = __webpack_require__(/*! ./game_main */ 249);

var _game_main2 = _interopRequireDefault(_game_main);

var _state = __webpack_require__(/*! ./states/state */ 78);

var _state2 = _interopRequireDefault(_state);

var _actionIndex = __webpack_require__(/*! ./actions/actionIndex */ 158);

var actions = _interopRequireWildcard(_actionIndex);

var _registration = __webpack_require__(/*! ./registration */ 251);

var _registration2 = _interopRequireDefault(_registration);

var _axios = __webpack_require__(/*! axios */ 152);

var _axios2 = _interopRequireDefault(_axios);

var _jquery = __webpack_require__(/*! jquery */ 579);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*global fb*/

var SERVER = 'http://localhost:8080/';

/*
const startGame = () => {
    $('#signinScreen').css('display', 'none');
    console.log(15);

    store.dispatch(actions.newPlayerRegistration());

    const game = new Game();
    
    $.ajax({
        url: SERVER + 'highestScore',
        type: 'GET',
        success: data => {
            state.gameHighestScore = data.result[0].highestScore;
            //$('body').data('gameHighestScore', gameHighestScore);
            const game = new Game();
        },
        error: e => {
            console.log(e);
        },
    });
    
};
*/

var object = _propTypes.PropTypes.object,
    func = _propTypes.PropTypes.func;

var App = function (_PureComponent) {
    _inherits(App, _PureComponent);

    /*
    static PropTypes = {
        gameHighestScore: object,
        getGameHighestScore: func,
        newPlayerRegistration: func,
    };
     static defaultProps = {
        gameHighestScore: 0,
        playerData: {},
    };
    
    state = {
        playerData: {},
    };
    */

    function App() {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

        _this.state = {
            showRegistration: false
        };

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
            this.startGame();
        }
    }, {
        key: 'startGame',
        value: function startGame() {
            (0, _jquery2.default)('#signinScreen').css('display', 'none');
            _store2.default.dispatch(actions.getGameHighestScore());

            var game = new _game_main2.default();
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            // This is called with the results from from FB.getLoginStatus().
            window.fbAsyncInit = function () {
                FB.init({
                    appId: '113731382506643',
                    cookie: true, // enable cookies to allow the server to access
                    // the session
                    xfbml: true, // parse social plugins on this page
                    version: 'v2.8' });

                FB.getLoginStatus(function (response) {
                    if (response.status === 'connected') {
                        FB.api('/me', function (response) {
                            var facebookId = response.id;
                            _store2.default.dispatch(actions.updateFacebookId(facebookId));

                            _axios2.default.get('http://localhost:8080/users/facebookId/' + facebookId).then(function (data) {
                                if (data.data.length === 0) {
                                    //show registration input box
                                    _this2.setState({ showRegistration: true });
                                } else {
                                    var playerScreenName = data.data[0].screenName;
                                    _store2.default.dispatch({
                                        type: 'UPDATE_SCREENAME',
                                        payload: playerScreenName
                                    });
                                    _this2.startGame();
                                }
                            }).catch(function (e) {
                                console.log(e);
                            });
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
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                this.state.showRegistration ? _react2.default.createElement(_registration2.default, null) : null,
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
/*
export default connect(storeState => ({
    gameHighestScore: storeState.gameHighestScore,
    playerData: storeState.playerData,
}));
*/


exports.default = App;

/***/ })

})
//# sourceMappingURL=0.efb42d0fcce40fbf7923.hot-update.js.map