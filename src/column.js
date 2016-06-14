import React, {Component, PropTypes} from 'react';

export default class Column extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {isHeader, children, ...extraProps} = this.props;
    const Cell = isHeader ? 'th' : 'td';

    return (
      <Cell {...extraProps}>
        {children}
      </Cell>
    );
  }
}

Column.propTypes = {
  prop      : PropTypes.string,
  render    : PropTypes.func,
  sortable  : PropTypes.bool,
  isHeader  : PropTypes.bool,
  width     : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className : PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};

Column.defaultProps = {
  sortable: true,
  isHeader: false
};