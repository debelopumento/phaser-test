webpackHotUpdate(0,{

/***/ 191:
/* unknown exports provided */
/* all exports used */
/*!*******************************!*\
  !*** ./~/prop-types/index.js ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ 190)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(/*! ./factoryWithThrowingShims */ 468)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../process/browser.js */ 1)))

/***/ }),

/***/ 217:
/* exports provided: subscriptionShape, storeShape */
/* exports used: storeShape, subscriptionShape */
/*!*********************************************!*\
  !*** ./~/react-redux/es/utils/PropTypes.js ***!
  \*********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__(/*! prop-types */ 191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return subscriptionShape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return storeShape; });


var subscriptionShape = __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.shape({
  trySubscribe: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  tryUnsubscribe: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  notifyNestedSubs: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  isSubscribed: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired
});

var storeShape = __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.shape({
  subscribe: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  dispatch: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  getState: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired
});

/***/ }),

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

var _react = __webpack_require__(/*! react */ 68);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ 191);

var _reactDom = __webpack_require__(/*! react-dom */ 97);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = __webpack_require__(/*! react-redux */ 216);

var _store = __webpack_require__(/*! ./store */ 156);

var _store2 = _interopRequireDefault(_store);

var _game_main = __webpack_require__(/*! ./game_main */ 249);

var _game_main2 = _interopRequireDefault(_game_main);

var _state = __webpack_require__(/*! ./states/state */ 78);

var _state2 = _interopRequireDefault(_state);

var _actionIndex = __webpack_require__(/*! ./actions/actionIndex */ 247);

var actions = _interopRequireWildcard(_actionIndex);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
/*
export default connect(storeState => ({
    gameHighestScore: storeState.gameHighestScore,
    playerData: storeState.playerData,
}));
*/


exports.default = App;

/***/ }),

/***/ 539:
/* exports provided: default */
/* exports used: default */
/*!*************************************************!*\
  !*** ./~/react-redux/es/components/Provider.js ***!
  \*************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(/*! prop-types */ 191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_PropTypes__ = __webpack_require__(/*! ../utils/PropTypes */ 217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_warning__ = __webpack_require__(/*! ../utils/warning */ 143);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Provider; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var didWarnAboutReceivingStore = false;
function warnAboutReceivingStore() {
  if (didWarnAboutReceivingStore) {
    return;
  }
  didWarnAboutReceivingStore = true;

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_warning__["a" /* default */])('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/reactjs/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
}

var Provider = function (_Component) {
  _inherits(Provider, _Component);

  Provider.prototype.getChildContext = function getChildContext() {
    return { store: this.store, storeSubscription: null };
  };

  function Provider(props, context) {
    _classCallCheck(this, Provider);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    _this.store = props.store;
    return _this;
  }

  Provider.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_0_react__["Children"].only(this.props.children);
  };

  return Provider;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);




if (process.env.NODE_ENV !== 'production') {
  Provider.prototype.componentWillReceiveProps = function (nextProps) {
    var store = this.store;
    var nextStore = nextProps.store;


    if (store !== nextStore) {
      warnAboutReceivingStore();
    }
  };
}

Provider.propTypes = {
  store: __WEBPACK_IMPORTED_MODULE_2__utils_PropTypes__["a" /* storeShape */].isRequired,
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element.isRequired
};
Provider.childContextTypes = {
  store: __WEBPACK_IMPORTED_MODULE_2__utils_PropTypes__["a" /* storeShape */].isRequired,
  storeSubscription: __WEBPACK_IMPORTED_MODULE_2__utils_PropTypes__["b" /* subscriptionShape */]
};
Provider.displayName = 'Provider';
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! ./../../../process/browser.js */ 1)))

/***/ })

})
//# sourceMappingURL=0.aa06edc922e2e94b1133.hot-update.js.map