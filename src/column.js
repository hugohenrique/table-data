import React, {Component, PropTypes} from 'react';

export default class Column extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {children, ...extraProps} = this.props;

    return (
      <td {...extraProps}>
        {children}
      </td>
    );
  }
}

Column.propTypes = {
  prop      : PropTypes.string,
  render    : PropTypes.func,
  className : PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};

Column.defaultProps = {};