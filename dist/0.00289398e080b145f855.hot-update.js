webpackHotUpdate(0,{

/***/ 100:
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
exports.getGameHighestScore = exports.newPlayerRegistration = exports.updateFacebookId = exports.updatePlayerId = exports.updatePersonalHighestScore = undefined;

var _axios = __webpack_require__(/*! axios */ 153);

var _axios2 = _interopRequireDefault(_axios);

var _store = __webpack_require__(/*! ../store */ 69);

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SERVER = 'http://localhost:8080/';

var updatePersonalHighestScore = exports.updatePersonalHighestScore = function updatePersonalHighestScore(score) {
    console.log(99, score);
    var _id = _store2.default.getState()._id;
    var url = SERVER + 'users/updateUserHighestScore/' + _id + '/' + score;
    console.log(100, url);
    (function (dispatch) {
        _axios2.default.put(url).then(function (data) {
            console.log(101, data);
            dispatch({
                type: 'UPDATE_PLAYER_HIGHEST_SCORE',
                payload: score
            });
        }).catch(function (e) {
            console.log(e);
        });
    });
};

var updatePlayerId = exports.updatePlayerId = function updatePlayerId(id) {
    return {
        type: 'UPDATE_PLAYER_ID',
        payload: id
    };
};

var updateFacebookId = exports.updateFacebookId = function updateFacebookId(facebookId) {
    return {
        type: 'UPDATE_FACEBOOKID',
        payload: facebookId
    };
};

var newPlayerRegistration = exports.newPlayerRegistration = function newPlayerRegistration(newPlayer) {
    return function (dispatch) {
        newPlayer.highestScore = 0;
        _axios2.default.post(SERVER + 'users/', newPlayer).then(function (data) {
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
    return function (dispatch) {
        console.log(200);
        _axios2.default.get('http://localhost:8080/highestScore/').then(function (data) {
            var gameHighestScore = data.data.result[0].highestScore;
            dispatch({
                type: 'UPDATE_GAME_HIGHEST_SCORE',
                payload: gameHighestScore
            });
        }).catch(function (e) {
            console.log(e);
        });
    };
};

/***/ })

})
//# sourceMappingURL=0.00289398e080b145f855.hot-update.js.map