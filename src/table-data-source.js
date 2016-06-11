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

export default class TableDataSource {
  constructor(source) {
    this.source = source || {
      columns : [],
      rows    : [{}]
    };
  }

  /**
   * @param at Index of column name to retrieve
   * @return value for column at given index or null if does not exist
   */
  columnAt(at) {
    return this.source.columns[at] || null;
  }

  rowAt(at) {
    return this.source.rows[at] || null;
  }

  cellAt({rowAt, columnAt} = {}) {
    if (null === rowAt) {
      return this.columnAt(columnAt);
    }

    const row = this.rowAt(rowAt);

    return row ? row[columnAt] || null : null;
  }

  rows() {
    return this.source.rows;
  }

  columns() {
    return this.source.columns;
  }

  addColumn(name) {
    const rows    = this.rows();
    const columns = this.columns();

    return new TableDataSource({
      ...this.source,
      rows    : rows.map(row => row.concat(null)),
      columns : columns.concat([name])
    });
  }

  removeColumn() {
    const nextColumns = this.columns().slice(0, this.columns().length - 1);
    const nextRows    = this.rows().map(row => row.slice(0, row.length - 1));

    return new TableDataSource({
      ...this.source,
      columns : nextColumns,
      rows    : nextRows
    });
  }

  addRow() {
    const rows     = this.rows();
    const nextRows = rows.concat([rows[0].map(() => null)]);

    return new TableDataSource({
      ...this.source,
      rows: nextRows
    });
  }

  removeRow() {
    const rows = this.rows();
    return new TableDataSource({
      ...this.source,
      rows: rows.slice(0, rows.length - 1)
    });
  }

  slice(startAt, endAt) {
    let rows = this.rows();

    if (undefined === endAt) {
      endAt = rows.length;
    }

    return new TableDataSource({
      ...this.source,
      rows: rows.slice(startAt, endAt)
    });
  }

  filterRows(callback) {
    const rows     = this.rows();
    const nextRows = rows.filter(callback);

    return new TableDataSource({
      ...this.source,
      rows: nextRows
    });
  }

  filter(filters, filterValues) {
    let rows       = this.rows();
    let filterFunc = filterPass.bind(null, filters);
    let filtered   = rows.filter(each => some(filterValues, filterFunc(each)));

    return new TableDataSource({
      ...this.source,
      rows: filtered
    });
  }

  sort(byValues) {
    let rows   = this.rows();
    let sorted = sortBy(rows, byValues.property);

    if (byValues.order === 'descending') {
      sorted.reverse();
    }

    return new TableDataSource({
      ...this.source,
      rows: sorted
    });
  }

  clear() {
    return new TableDataSource();
  }

  toJSON() {
    return {...this.source};
  }
}

