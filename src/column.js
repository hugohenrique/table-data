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
  isHeader  : PropTypes.bool,
  className : PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};

Column.defaultProps = {
  isHeader: false
};