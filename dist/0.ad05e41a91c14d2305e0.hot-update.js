webpackHotUpdate(0,{

/***/ 150:
false,

/***/ 151:
false,

/***/ 152:
false,

/***/ 153:
false,

/***/ 154:
false,

/***/ 155:
false,

/***/ 191:
/* unknown exports provided */
/* exports used: default */
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

/***/ 229:
false,

/***/ 230:
false,

/***/ 231:
false,

/***/ 232:
false,

/***/ 233:
false,

/***/ 234:
false,

/***/ 235:
false,

/***/ 236:
false,

/***/ 237:
false,

/***/ 238:
false,

/***/ 239:
false,

/***/ 24:
false,

/***/ 240:
false,

/***/ 241:
false,

/***/ 242:
false,

/***/ 243:
false,

/***/ 244:
false,

/***/ 245:
false,

/***/ 246:
false,

/***/ 247:
false,

/***/ 248:
/* unknown exports provided */
/* all exports used */
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: SyntaxError: Unexpected token (108:21)\n\n\u001b[0m \u001b[90m 106 | \u001b[39m\n \u001b[90m 107 | \u001b[39m\u001b[36mexport\u001b[39m \u001b[36mdefault\u001b[39m \u001b[36mclass\u001b[39m \u001b[33mApp\u001b[39m \u001b[36mextends\u001b[39m \u001b[33mPureComponent\u001b[39m {\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 108 | \u001b[39m    static \u001b[33mPropTypes\u001b[39m \u001b[33m=\u001b[39m {\n \u001b[90m     | \u001b[39m                     \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 109 | \u001b[39m        gameHighestScore\u001b[33m:\u001b[39m object\u001b[33m,\u001b[39m\n \u001b[90m 110 | \u001b[39m        getGameHighestScore\u001b[33m:\u001b[39m func\u001b[33m,\u001b[39m\n \u001b[90m 111 | \u001b[39m        newPlayerRegistration\u001b[33m:\u001b[39m func\u001b[33m,\u001b[39m\u001b[0m\n");

/***/ }),

/***/ 249:
false,

/***/ 251:
false,

/***/ 252:
false,

/***/ 253:
false,

/***/ 254:
false,

/***/ 255:
false,

/***/ 256:
false,

/***/ 257:
false,

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

/***/ }),

/***/ 77:
false,

/***/ 78:
false,

/***/ 98:
false,

/***/ 99:
false

})
//# sourceMappingURL=0.ad05e41a91c14d2305e0.hot-update.js.map