import {sortBy, some} from 'lodash';

/**
 * @param {!object} filters
 * @param {!array} data
 *
 * @return {function(*, string)} Function to be executed for each entry in data.
 */
function filterPass(filters, data) {
  return function(filterValue, key) {
    var filterDef = filters[key];
    var partial = filterDef.filter.bind(null, filterValue);
    if (!filterDef.property) {
      // Filter is for all properties
      return some(data, each => partial(each));
    } else {
      // Filter is for one property
      return partial(data[filterDef.property]);
    }
  };
}

export default class DataSource {
  constructor(source) {
    this.source = source || {};
  }
  rows() {
    return this.source;
  }
  columns() {
    return Object.keys(this.source[0]);
  }
  slice(startAt, endAt) {
    let rows = this.rows();

    if (undefined === endAt) {
      endAt = rows.length;
    }

    return new DataSource(rows.slice(startAt, endAt));
  }
  filter(filters, filterValues) {
    let rows       = this.rows();
    let filterFunc = filterPass.bind(null, filters);
    let filtered   = rows.filter(each => some(filterValues, filterFunc(each)));

    return new DataSource(filtered);
  }
  sort(byValues) {
    let rows   = this.rows();
    let sorted = sortBy(rows, byValues.prop);

    if (byValues.order === 'descending') {
      sorted.reverse();
    }

    return new DataSource(sorted);
  }
  clear() {
    return new DataSource();
  }
  toJSON() {
    return {...this.source};
  }
}

