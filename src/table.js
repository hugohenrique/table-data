import React, {Component} from 'react';
import PropTypes        from 'prop-types';
import Column           from './column';
import DataSource       from './data-source';
import SortHeaderColumn from './sort-header-column';

let isEmpty = value => value == null || value === '';

function getCell({prop, defaultContent, render}, row) {
  if (isEmpty(prop) && render) {
    return render(row);
  }
  let convertedKeys = prop.split('.');
  let rowNormalized = row[convertedKeys[0]];
  if (convertedKeys.length > 1) {
    convertedKeys.splice(1).forEach(key => {
      rowNormalized = rowNormalized[key];
    });
  }
  if (!isEmpty(prop) && isEmpty(rowNormalized)) {
    return defaultContent;
  }
  if (render) {
    return render(rowNormalized);
  }
  return rowNormalized;
}

export default class Table extends Component {
  buildHeaders() {
    let {columns, sortBy, onSort} = this.props;
    return columns.map((col, i) => {
      if (col.sortable) {
        return (
          <SortHeaderColumn
            key={i}
            column={col}
            sortBy={sortBy}
            onSort={onSort}>
            <span>{col.title}</span>
          </SortHeaderColumn>
        );
      }
      return (
        <Column
          key={i}
          column={col}
          sortBy={sortBy}
          onSort={onSort}
          isHeader={true}>
          <span>{col.title}</span>
        </Column>
      );
    });
  }
  buildRows() {
    const {dataSource, columns, noData} = this.props;
    if (dataSource.rows().length === 0) {
      return (
        <tr>
          <td colSpan={columns.length} className="text-center">{noData}</td>
        </tr>
      );
    }
    return dataSource.rows().map((row, k) => (
      <tr key={k}>
        {columns.map((col, i) => (
          <Column key={i} style={col.style}>
            {getCell(col, row)}
          </Column>
        ))}
      </tr>
    ));
  }
  render() {
    return (
      <table className={this.props.className}>
        <thead>
          <tr>
            {this.buildHeaders()}
          </tr>
        </thead>
        <tbody>
          {this.buildRows()}
        </tbody>
      </table>
    );
  }
}

Table.defaultProps = {
  sortBy: {},
  noData: 'No data'
};

Table.propTypes = {
  className: PropTypes.string,
  dataSource: PropTypes.instanceOf(DataSource).isRequired,
  sortBy: PropTypes.shape({
    prop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    order: PropTypes.oneOf(['ascending', 'descending'])
  }),
  onSort: PropTypes.func,
  noData: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};
