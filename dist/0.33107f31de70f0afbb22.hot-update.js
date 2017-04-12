webpackHotUpdate(0,{

/***/ 578:
/* unknown exports provided */
/* all exports used */
/*!*****************************!*\
  !*** ./src/registration.js ***!
  \*****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ 68);

var _react2 = _interopRequireDefault(_react);

var _actionIndex = __webpack_require__(/*! ./actions/actionIndex */ 247);

var actions = _interopRequireWildcard(_actionIndex);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Registration = function (_React$PureComponent) {
    _inherits(Registration, _React$PureComponent);

    function Registration() {
        _classCallCheck(this, Registration);

        return _possibleConstructorReturn(this, (Registration.__proto__ || Object.getPrototypeOf(Registration)).apply(this, arguments));
    }

    _createClass(Registration, [{
        key: 'handleSubmit',
        value: function handleSubmit(event) {
            event.preventDefault();
            var newPlayer = {
                facebookId: facebookId,
                screenName: $('#inputScreenName').val()
            };
            actions.newPlayerRegistration(newPlayer);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'p',
                    null,
                    'Please enter a screen name'
                ),
                _react2.default.createElement('input', { id: 'inputScreenName', type: 'text' }),
                _react2.default.createElement('input', { id: 'submitScreenName', type: 'submit', value: 'submit' })
            );
        }
    }]);

    return Registration;
}(_react2.default.PureComponent);

exports.default = Registration;

/***/ })

})
//# sourceMappingURL=0.33107f31de70f0afbb22.hot-update.js.map