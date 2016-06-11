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
  property : PropTypes.string,
  label    : PropTypes.string,
  render   : PropTypes.func,
  sortable : PropTypes.bool,
  isHeader : PropTypes.bool,
  content  : PropTypes.string
};

Column.defaultProps = {
  sortable: true,
  isHeader: false
};