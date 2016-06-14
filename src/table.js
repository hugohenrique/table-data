import React, {Component, PropTypes} from 'react';
import Column           from './column';
import DataSource       from './table-data-source';
import SortHeaderColumn from './sort-header-column';

let isEmpty = value => value == null || value === '';

let getCellValue = ({prop, defaultContent, render}, row) =>
    // Return `defaultContent` if the value is empty.
    !isEmpty(prop) && isEmpty(row[prop]) ? defaultContent :
    // Use the render function for the value.
    render ? render(row[prop], row) :
    // Otherwise just return the value.
    row[prop];

export default class Table extends Component {
  constructor(props) {
    super(props);
  }

  buildHeaders() {
    let {columns, sortBy, onSort} = this.props;

    return columns.map((col, i) => {
      return (
        <SortHeaderColumn
          key={i}
          column={col}
          sortBy={sortBy}
          onSort={onSort}>
          <span>{col.title}</span>
        </SortHeaderColumn>
      );
    });
  }

  buildRows() {
    const {dataSource, columns} = this.props;

    if (dataSource.rows().length === 0) {
      return (
        <tr>
          <td colSpan={columns.length} className="text-center">No data</td>
        </tr>
      );
    }

    return dataSource.rows().map((row, k) => (
      <tr key={k}>
        {columns.map((col, i) => (
          <Column key={i}>
            {getCellValue(col, row)}
          </Column>
        ))}
      </tr>
    ));
  }

  render() {
    return (
      <table {...this.props}>
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
  sortBy: {}
};

Table.propTypes = {
  className: PropTypes.string,
  dataSource: PropTypes.instanceOf(DataSource).isRequired,
  sortBy: PropTypes.shape({
    prop  : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    order : PropTypes.oneOf(['ascending', 'descending'])
  }),
  onSort: PropTypes.func
};