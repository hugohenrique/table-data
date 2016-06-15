'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _table = require('./table');

var _table2 = _interopRequireDefault(_table);

var _tableDataMixin = require('./table-data-mixin');

var _tableDataMixin2 = _interopRequireDefault(_tableDataMixin);

var _pagination = require('./pagination');

var _pagination2 = _interopRequireDefault(_pagination);

var _searchField = require('./search-field');

var _searchField2 = _interopRequireDefault(_searchField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataTable = _react2.default.createClass({
  displayName: 'DataTable',

  mixins: [_tableDataMixin2.default],

  render: function render() {
    var page = this.buildPage();

    return _react2.default.createElement(
      'div',
      { className: this.props.className },
      _react2.default.createElement(_searchField2.default, {
        id: 'search-field',
        label: 'Search:',
        value: this.state.filterValues.globalSearch,
        onChange: this.onFilter.bind(this, 'globalSearch')
      }),
      _react2.default.createElement(_table2.default, {
        className: 'table table-bordered',
        columns: this.props.columns,
        dataSource: page.dataSource,
        sortBy: this.state.sortBy,
        onSort: this.onSort }),
      _react2.default.createElement(_pagination2.default, {
        className: 'pagination',
        currentPage: page.currentPage,
        totalPages: page.totalPages,
        onChangePage: this.onChangePage
      })
    );
  }
});

exports.default = DataTable;