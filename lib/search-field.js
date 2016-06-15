'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchField = function (_Component) {
  _inherits(SearchField, _Component);

  function SearchField() {
    var _Object$getPrototypeO;

    _classCallCheck(this, SearchField);

    for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
      props[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(SearchField)).call.apply(_Object$getPrototypeO, [this].concat(props)));

    _this.state = { value: '' };
    _this.onChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(SearchField, [{
    key: 'handleChange',
    value: function handleChange(event) {
      var value = event.target.value;
      this.setState({ value: value });
      this.props.onChange(value);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'label',
          { htmlFor: this.props.id },
          this.props.label
        ),
        _react2.default.createElement('input', {
          className: 'form-control',
          id: this.props.id,
          type: 'search',
          value: this.state.value,
          onChange: this.handleChange.bind(this)
        })
      );
    }
  }]);

  return SearchField;
}(_react.Component);

exports.default = SearchField;