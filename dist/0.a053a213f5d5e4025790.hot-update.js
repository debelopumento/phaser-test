webpackHotUpdate(0,{

/***/ 580:
/* unknown exports provided */
/* all exports used */
/*!**************************************!*\
  !*** ./src/reducers/reducerIndex.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(/*! redux */ 149);

var gameHighestScoreReducer = function gameHighestScoreReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var action = arguments[1];

    switch (action.type) {
        case 'UPDATE_GAME_HIGHEST_SCORE':
            {
                return action.payload;
            }
        default:
            return state;
    }
};

var facebookIdReducer = function facebookIdReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var action = arguments[1];

    switch (action.type) {
        case 'UPDATE_FACEBOOKID':
            {
                return action.payload;
            }
        default:
            return state;
    }
};

var screenNameReducer = function screenNameReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var action = arguments[1];

    switch (action.type) {
        case 'UPDATE_SCREENNAME':
            {
                return action.payload;
            }
        default:
            return state;
    }
};
var playerHighestScoreReducer = function playerHighestScoreReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var action = arguments[1];

    switch (action.type) {
        case 'UPDATE_PLAYER_HIGHEST_SCORE':
            {
                return action.payload;
            }
        default:
            return state;
    }
};

var _idReducer = function _idReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var action = arguments[1];

    switch (action.type) {
        case 'UPDATE_PLAYER_ID':
            {
                return action.payload;
            }

        default:
            return state;
    }
};

var allReducers = (0, _redux.combineReducers)({
    gameHighestScore: gameHighestScoreReducer,
    facebookId: facebookIdReducer,
    screenName: screenNameReducer,
    playerHighestScore: playerHighestScoreReducer,
    _id: _idReducer
});

exports.default = allReducers;

/***/ })

})
//# sourceMappingURL=0.a053a213f5d5e4025790.hot-update.js.map