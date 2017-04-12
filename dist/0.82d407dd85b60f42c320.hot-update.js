webpackHotUpdate(0,{

/***/ 156:
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

var _redux = __webpack_require__(/*! redux */ 146);

var _reduxLogger = __webpack_require__(/*! redux-logger */ 564);

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _reduxThunk = __webpack_require__(/*! redux-thunk */ 567);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxPromiseMiddleware = __webpack_require__(/*! redux-promise-middleware */ 565);

var _reduxPromiseMiddleware2 = _interopRequireDefault(_reduxPromiseMiddleware);

var _index = __webpack_require__(/*! ./reducers/index */ 250);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var middleware = void 0;

if (process.env.NODE_ENV !== 'production') {
    middleware = (0, _redux.applyMiddleware)((0, _reduxPromiseMiddleware2.default)(), _reduxThunk2.default, (0, _reduxLogger2.default)());
}

if (process.env.NODE_ENV === 'production') {
    middleware = (0, _redux.applyMiddleware)((0, _reduxPromiseMiddleware2.default)(), _reduxThunk2.default);
}

console.log(10, _index2.default.playerDataReducer);

//export default createStore(allReducers, middleware);
exports.default = (0, _redux.createStore)(_index2.default, (0, _redux.applyMiddleware)((0, _reduxPromiseMiddleware2.default)(), _reduxThunk2.default, (0, _reduxLogger2.default)()));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../~/process/browser.js */ 1)))

/***/ })

})
//# sourceMappingURL=0.82d407dd85b60f42c320.hot-update.js.map