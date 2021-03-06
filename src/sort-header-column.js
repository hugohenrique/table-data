import React, {Component} from 'react';
import PropTypes from 'prop-types';

function buildSort(column, sortBy, onSort) {
  let order     = sortBy.prop === column.prop ? sortBy.order : 'none';
  let nextOrder = order === 'ascending' ? 'descending' : 'ascending';
  let sortEvent = onSort.bind(null, {prop: column.prop, order: nextOrder});

  return {
    'onClick': sortEvent,
    // Fire the sort event on enter.
    'onKeyDown': (event) => {
      if (event.keyCode === 13) {
        sortEvent();
      }
    },
    // Prevents selection with mouse.
    'onMouseDown': (event) => {
      return event.preventDefault();
    },
    'tabIndex'   : 0,
    'aria-sort'  : order,
    'aria-label' : `${column.title}: activate to sort column ${nextOrder}`
  };
}

export default class SortHeaderColumn extends Component {
  render() {
    let {sortBy, onSort, column, children} = this.props;
    let sortProps, order;

    // Only add sorting events if the column has a property and is sortable.
    if (typeof onSort === 'function' && 'prop' in column) {
      sortProps = buildSort(column, sortBy, onSort);
      order     = sortProps['aria-sort'];
    }

    return (
      <th className="sortable" role="columnheader" scope="col" style={{width: column.width}} {...sortProps}>
        {children}
        {typeof order !== 'undefined' ? <span className={`sort-icon sort-${order}`} aria-hidden="true" /> : null}
      </th>
    );
  }
}

SortHeaderColumn.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sortBy: PropTypes.shape({
    prop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    order: PropTypes.oneOf(['ascending', 'descending'])
  }),
  onSort: PropTypes.func
};