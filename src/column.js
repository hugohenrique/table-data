import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Column extends Component {
  static defaultProps = {
    isHeader: false
  };
  static propTypes = {
    prop      : PropTypes.string,
    render    : PropTypes.func,
    isHeader  : PropTypes.bool,
    className : PropTypes.oneOfType([PropTypes.string, PropTypes.func])
  };
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
