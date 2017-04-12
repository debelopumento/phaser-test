webpackHotUpdate(0,{

/***/ 221:
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

var _redux = __webpack_require__(/*! redux */ 143);

var gameHighestScoreReducer = function gameHighestScoreReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var action = arguments[1];

    switch (action.type) {
        case 'GET_GAME_HIGHEST_SCORE':
            {
                return action.payload;
            }
        default:
            return state;
    }
};

var playerDataReducer = function playerDataReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var action = arguments[1];

    switch (action.type) {
        case 'NEW_PLAYER_REGISTRATION':
            {
                return action.payload;
            }
        default:
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
//# sourceMappingURL=0.bbdebd586aeb210d4f7b.hot-update.js.map