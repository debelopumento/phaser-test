webpackHotUpdate(0,{

/***/ 250:
/* unknown exports provided */
/* all exports used */
/*!*******************************!*\
  !*** ./src/reducers/index.js ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(/*! redux */ 146);

var gameHighestScoreReducer = function gameHighestScoreReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var action = arguments[1];

    switch (action.type) {
        case 'UPDATE_GAME_HIGHEST_SCORE':
            {
                console.log(41);
                return action.payload;
            }
        default:
            return state;
    }
};

var playerDataReducer = function playerDataReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var action = arguments[1];

    if (action.type === 'UPDATE_FACEBOOKID') {
        console.log(400);
    }

    switch (action.type) {
        case 'NEW_PLAYER_REGISTRATION':
            {
                console.log(44);
                return action.payload;
            }
        case 'UPDATE_FACEBOOKID':
            {
                console.log(41);
                state.facebookId = action.payload;
                return state;
            }
        default:
            console.log(43);
            return state;
    }
};

var allReducers = (0, _redux.combineReducers)({
    gameHighestScore: gameHighestScoreReducer,
    playerData: playerDataReducer
});

exports.default = allReducers;

/***/ })

})
//# sourceMappingURL=0.22fdc081e5b309285526.hot-update.js.map