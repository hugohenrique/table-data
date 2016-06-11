import React, {Component, PropTypes} from 'react';
import ReactDOM               from 'react-dom';
import DataSource             from './table-data-source';
import Column                 from './column';

let isEmpty = value => value == null || value === '';

let getCellValue = ({key, defaultContent, render}, row) =>
    // Return `defaultContent` if the value is empty.
    !isEmpty(key) && isEmpty(row[key]) ? defaultContent :
    // Use the render function for the value.
    render ? render(row[key], row) :
    // Otherwise just return the value.
    row[key];

function buildSortProps(column, sortBy, onSort) {
  let order     = sortBy.property === column.property ? sortBy.order : 'none';
  let nextOrder = order === 'ascending' ? 'descending' : 'ascending';
  let sortEvent = onSort.bind(null, {property: column.property, order: nextOrder});

  return {
    'onClick': sortEvent,
    // Fire the sort event on enter.
    'onKeyDown': (e) => {
      if (e.keyCode === 13) {
        sortEvent();
      }
    },
    // Prevents selection with mouse.
    'onMouseDown': e => e.preventDefault(),
    'tabIndex'   : 0,
    'aria-sort'  : order,
    'aria-label' : `${column.title}: activate to sort column ${nextOrder}`
  };
}

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.headers = [];
  }

  componentDidMount() {
    this.headers.forEach(header => {
      let thDom = ReactDOM.findDOMNode(header);

      if (!thDom.style.width) {
        thDom.style.width = `${thDom.offsetWidth}px`;
      }
    });
  }

  buildHeaders() {
    let {dataSource, sortBy, onSort} = this.props;

    return dataSource.columns().map((col, i) => {
      let sortProps, order;

      // Only add sorting events if the column has a property and is sortable.
      if (typeof onSort === 'function' && col.sortable !== false && 'property' in col) {
        sortProps = buildSortProps(col, sortBy, onSort);
        order     = sortProps['aria-sort'];
      }

      return (
        <Column
          ref={col.property}
          key={col.property}
          property={col.property}
          label={col.label}
          isHeader={true}
          role="columnheader"
          scope="col"
          {...sortProps}>
          <span>{col.label}</span>
          {typeof order !== 'undefined' ? <span className={`sort-icon sort-${order}`} aria-hidden="true" /> : null}
        </Column>
      );
    });
  }

  buildRows() {
    const {dataSource, keys, sortBy, onSort} = this.props;

    if (dataSource.rows().length === 0) {
      return (
        <tr>
          <td colSpan={dataSource.columns().length} className="text-center">No data</td>
        </tr>
      );
    }

    return dataSource.rows().map((row, rid) => (
      <tr key={row.id}>
        {dataSource.columns().map((column, cid) => (
          <Column key={cid} isHeader={false}>
            {row[column.property]}
          </Column>
        ))}
      </tr>
    ));
  }

  render() {
    let {columns, keys, buildRowOptions, sortBy, onSort} = this.props;

    return (
      <table {...this.props}>
        <caption className="sr-only" role="alert" aria-live="polite">
          {`Sorted by ${sortBy.property}: ${sortBy.order} order`}
        </caption>
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
  // buildRowOptions: PropTypes.func,
  // keys: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]).isRequired,
  className: PropTypes.string,
  dataSource: PropTypes.instanceOf(DataSource).isRequired,
  sortBy: PropTypes.shape({
    property: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    order   : PropTypes.oneOf(['ascending', 'descending'])
  }),
  onSort: PropTypes.func
};