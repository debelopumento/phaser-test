webpackHotUpdate(0,{

/***/ 247:
/* unknown exports provided */
/* all exports used */
/*!************************************!*\
  !*** ./src/actions/actionIndex.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getGameHighestScore = exports.newPlayerRegistration = exports.updateFacebookId = undefined;

var _axios = __webpack_require__(/*! axios */ 229);

var _axios2 = _interopRequireDefault(_axios);

var _store = __webpack_require__(/*! ../store */ 156);

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SERVER = 'http://localhost:8080/';

var updateFacebookId = exports.updateFacebookId = function updateFacebookId(facebookId) {
    return {
        type: 'UPDATE_FACEBOOKID',
        payload: facebookId
    };
};

var newPlayerRegistration = exports.newPlayerRegistration = function newPlayerRegistration(newPlayer) {
    return function (dispatch) {
        _axios2.default.post('http://localhost:8080/users/', newPlayer).then(function (player) {
            console.log(4, player);
            dispatch({
                type: 'UPDATE_SCREENNAME',
                payload: player.screenName
            });
        }).catch(function (e) {
            console.log(e);
        });
    };
};

var getGameHighestScore = exports.getGameHighestScore = function getGameHighestScore() {
    (function (dispatch) {
        _axios2.default.get('http://localhost:8080/highestScore/').then(function (data) {
            var gameHighestScore = data.result[0].highestScore;
            dispatch({
                type: 'UPDATE_GAME_HIGHEST_SCORE',
                playload: gameHighestScore
            });
        }).catch(function (e) {
            console.log(e);
        });
    });
};

/***/ })

})
//# sourceMappingURL=0.ab07a98a4a324728a082.hot-update.js.map