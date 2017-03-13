import React, {Component, PropTypes} from 'react';

export default class Column extends Component {
  render() {
    const {isHeader, children} = this.props;
    const Cell = isHeader ? 'th' : 'td';

    return (
      <Cell {...this.props.extraProps}>
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
