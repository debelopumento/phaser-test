webpackHotUpdate(0,{

/***/ 250:
false,

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

var allReducers = (0, _redux.combineReducers)({
    gameHighestScore: gameHighestScoreReducer,
    facebookId: facebookIdReducer,
    screenName: screenNameReducer,
    playerHighestScore: playerHighestScoreReducer
});

exports.default = allReducers;

/***/ }),

/***/ 69:
/* unknown exports provided */
/* all exports used */
/*!**********************!*\
  !*** ./src/store.js ***!
  \**********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(/*! redux */ 149);

var _reduxLogger = __webpack_require__(/*! redux-logger */ 566);

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _reduxThunk = __webpack_require__(/*! redux-thunk */ 569);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxPromiseMiddleware = __webpack_require__(/*! redux-promise-middleware */ 567);

var _reduxPromiseMiddleware2 = _interopRequireDefault(_reduxPromiseMiddleware);

var _reducerIndex = __webpack_require__(/*! ./reducers/reducerIndex */ 580);

var _reducerIndex2 = _interopRequireDefault(_reducerIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var middleware = void 0;

if (process.env.NODE_ENV !== 'production') {
    middleware = (0, _redux.applyMiddleware)((0, _reduxPromiseMiddleware2.default)(), _reduxThunk2.default, (0, _reduxLogger2.default)());
}

if (process.env.NODE_ENV === 'production') {
    middleware = (0, _redux.applyMiddleware)((0, _reduxPromiseMiddleware2.default)(), _reduxThunk2.default);
}

//export default createStore(allReducers, middleware);
exports.default = (0, _redux.createStore)(_reducerIndex2.default, (0, _redux.applyMiddleware)((0, _reduxPromiseMiddleware2.default)(), _reduxThunk2.default, (0, _reduxLogger2.default)()));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../~/process/browser.js */ 1)))

/***/ })

})
//# sourceMappingURL=0.d785285e0c33cd52717d.hot-update.js.map