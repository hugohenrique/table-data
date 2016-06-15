'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _column = require('./column');

var _column2 = _interopRequireDefault(_column);

var _tableDataSource = require('./table-data-source');

var _tableDataSource2 = _interopRequireDefault(_tableDataSource);

var _sortHeaderColumn = require('./sort-header-column');

var _sortHeaderColumn2 = _interopRequireDefault(_sortHeaderColumn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isEmpty = function isEmpty(value) {
  return value == null || value === '';
};

var getCellValue = function getCellValue(_ref, row) {
  var prop = _ref.prop;
  var defaultContent = _ref.defaultContent;
  var render = _ref.render;
  return(
    // Return `defaultContent` if the value is empty.
    !isEmpty(prop) && isEmpty(row[prop]) ? defaultContent :
    // Use the render function for the value.
    render ? render(row[prop], row) :
    // Otherwise just return the value.
    row[prop]
  );
};

var Table = function (_Component) {
  _inherits(Table, _Component);

  function Table(props) {
    _classCallCheck(this, Table);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Table).call(this, props));
  }

  _createClass(Table, [{
    key: 'buildHeaders',
    value: function buildHeaders() {
      var _props = this.props;
      var columns = _props.columns;
      var sortBy = _props.sortBy;
      var onSort = _props.onSort;


      return columns.map(function (col, i) {
        if (col.sortable) {
          return _react2.default.createElement(
            _sortHeaderColumn2.default,
            {
              key: i,
              column: col,
              sortBy: sortBy,
              onSort: onSort },
            _react2.default.createElement(
              'span',
              null,
              col.title
            )
          );
        }

        return _react2.default.createElement(
          _column2.default,
          {
            key: i,
            column: col,
            sortBy: sortBy,
            onSort: onSort,
            isHeader: true },
          _react2.default.createElement(
            'span',
            null,
            col.title
          )
        );
      });
    }
  }, {
    key: 'buildRows',
    value: function buildRows() {
      var _props2 = this.props;
      var dataSource = _props2.dataSource;
      var columns = _props2.columns;


      if (dataSource.rows().length === 0) {
        return _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            { colSpan: columns.length, className: 'text-center' },
            'No data'
          )
        );
      }

      return dataSource.rows().map(function (row, k) {
        return _react2.default.createElement(
          'tr',
          { key: k },
          columns.map(function (col, i) {
            return _react2.default.createElement(
              _column2.default,
              { key: i },
              getCellValue(col, row)
            );
          })
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'table',
        this.props,
        _react2.default.createElement(
          'thead',
          null,
          _react2.default.createElement(
            'tr',
            null,
            this.buildHeaders()
          )
        ),
        _react2.default.createElement(
          'tbody',
          null,
          this.buildRows()
        )
      );
    }
  }]);

  return Table;
}(_react.Component);

exports.default = Table;


Table.defaultProps = {
  sortBy: {}
};

Table.propTypes = {
  className: _react.PropTypes.string,
  dataSource: _react.PropTypes.instanceOf(_tableDataSource2.default).isRequired,
  sortBy: _react.PropTypes.shape({
    prop: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
    order: _react.PropTypes.oneOf(['ascending', 'descending'])
  }),
  onSort: _react.PropTypes.func
};