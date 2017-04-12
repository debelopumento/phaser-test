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

var _store = __webpack_require__(/*! ./store */ 156);

var _store2 = _interopRequireDefault(_store);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Registration = function (_React$PureComponent) {
    _inherits(Registration, _React$PureComponent);

    function Registration() {
        _classCallCheck(this, Registration);

        var _this = _possibleConstructorReturn(this, (Registration.__proto__ || Object.getPrototypeOf(Registration)).call(this));

        _this.state = {
            screenName: '',
            facebookId: ''
        };
        _store2.default.subscribe(function () {
            _this.setState({
                facebookId: _store2.default.getState(facebookId)
            });
        });
        console.log(1, _this.state.facebookId);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        console.log(2, _store2.default);
        return _this;
    }

    _createClass(Registration, [{
        key: 'handleSubmit',
        value: function handleSubmit(event) {
            event.preventDefault();
            var newPlayer = {
                facebookId: this.state.facebookId,
                screenName: this.state.screenName
            };
            console.log(3, newPlayer);
            actions.newPlayerRegistration(newPlayer);
        }
    }, {
        key: 'handleChange',
        value: function handleChange(event) {
            var screenName = event.target.value;
            this.setState({ screenName: screenName });
            console.log(4, screenName);
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
                _react2.default.createElement('input', { type: 'text', onChange: this.handleChange }),
                _react2.default.createElement('input', {
                    type: 'submit',
                    value: 'submit',
                    onClick: this.handleSubmit
                })
            );
        }
    }]);

    return Registration;
}(_react2.default.PureComponent);

exports.default = Registration;

/***/ })

})
//# sourceMappingURL=0.d1ac5dab68ce1733139e.hot-update.js.map