'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function buildSort(column, sortBy, onSort) {
  var order = sortBy.prop === column.prop ? sortBy.order : 'none';
  var nextOrder = order === 'ascending' ? 'descending' : 'ascending';

  var sortEvent = onSort.bind(null, { prop: column.prop, order: nextOrder });

  return {
    'onClick': sortEvent,
    // Fire the sort event on enter.
    'onKeyDown': function onKeyDown(event) {
      if (event.keyCode === 13) {
        sortEvent();
      }
    },
    // Prevents selection with mouse.
    'onMouseDown': function onMouseDown(event) {
      return event.preventDefault();
    },
    'tabIndex': 0,
    'aria-sort': order,
    'aria-label': column.title + ': activate to sort column ' + nextOrder
  };
}

var SortHeaderColumn = function (_Component) {
  _inherits(SortHeaderColumn, _Component);

  function SortHeaderColumn() {
    _classCallCheck(this, SortHeaderColumn);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SortHeaderColumn).apply(this, arguments));
  }

  _createClass(SortHeaderColumn, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var sortBy = _props.sortBy;
      var onSort = _props.onSort;
      var column = _props.column;
      var children = _props.children;

      var sortProps = void 0,
          order = void 0;

      // Only add sorting events if the column has a property and is sortable.
      if (typeof onSort === 'function' && 'prop' in column) {
        sortProps = buildSort(column, sortBy, onSort);
        order = sortProps['aria-sort'];
      }

      return _react2.default.createElement(
        'th',
        _extends({ className: 'sortable', role: 'columnheader', scope: 'col', style: { width: column.width } }, sortProps),
        children,
        typeof order !== 'undefined' ? _react2.default.createElement('span', { className: 'sort-icon sort-' + order, 'aria-hidden': 'true' }) : null
      );
    }
  }]);

  return SortHeaderColumn;
}(_react.Component);

exports.default = SortHeaderColumn;


SortHeaderColumn.propTypes = {
  width: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  sortBy: _react.PropTypes.shape({
    prop: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
    order: _react.PropTypes.oneOf(['ascending', 'descending'])
  }),
  onSort: _react.PropTypes.func
};