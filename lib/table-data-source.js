'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @param {!object} filters
 * @param {!array} data
 *
 * @return {function(*, string)} Function to be executed for each entry in data.
 */
function filterPass(filters, data) {
  return function (filterValue, key) {
    var filterDef = filters[key];
    var partial = filterDef.filter.bind(null, filterValue);
    if (!filterDef.property) {
      // Filter is for all properties
      return (0, _lodash.some)(data, function (each) {
        return partial(each);
      });
    } else {
      // Filter is for one property
      return partial(data[filterDef.property]);
    }
  };
}

var TableDataSource = function () {
  function TableDataSource(source) {
    _classCallCheck(this, TableDataSource);

    this.source = source || {};
  }

  _createClass(TableDataSource, [{
    key: 'rows',
    value: function rows() {
      return this.source;
    }
  }, {
    key: 'columns',
    value: function columns() {
      return Object.keys(this.source[0]);
    }
  }, {
    key: 'slice',
    value: function slice(startAt, endAt) {
      var rows = this.rows();

      if (undefined === endAt) {
        endAt = rows.length;
      }

      return new TableDataSource(rows.slice(startAt, endAt));
    }
  }, {
    key: 'filter',
    value: function filter(filters, filterValues) {
      var rows = this.rows();
      var filterFunc = filterPass.bind(null, filters);
      var filtered = rows.filter(function (each) {
        return (0, _lodash.some)(filterValues, filterFunc(each));
      });

      return new TableDataSource(filtered);
    }
  }, {
    key: 'sort',
    value: function sort(byValues) {
      var rows = this.rows();
      var sorted = (0, _lodash.sortBy)(rows, byValues.prop);

      if (byValues.order === 'descending') {
        sorted.reverse();
      }

      return new TableDataSource(sorted);
    }
  }, {
    key: 'clear',
    value: function clear() {
      return new TableDataSource();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return _extends({}, this.source);
    }
  }]);

  return TableDataSource;
}();

exports.default = TableDataSource;