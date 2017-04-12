webpackHotUpdate(0,{

/***/ 158:
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

var _axios = __webpack_require__(/*! axios */ 152);

var _axios2 = _interopRequireDefault(_axios);

var _store = __webpack_require__(/*! ../store */ 79);

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
        newPlayer.highestScore = 0;
        console.log(5, newPlayer);
        _axios2.default.post('http://localhost:8080/users/', newPlayer).then(function (data) {
            console.log(4, data.data.screenName);
            dispatch({
                type: 'UPDATE_SCREENNAME',
                payload: data.data.screenName
            });
        }).catch(function (e) {
            console.log(e);
        });
    };
};

var getGameHighestScore = exports.getGameHighestScore = function getGameHighestScore() {
    (function (dispatch) {
        console.log(12);
        _axios2.default.get('http://localhost:8080/highestScore/').then(function (data) {
            var gameHighestScore = data.result[0].highestScore;
            console.log(11, gameHighestScore);
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
//# sourceMappingURL=0.b86b7ba497f6e559fc84.hot-update.js.map