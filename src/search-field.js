import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class SearchField extends Component {
  static propTypes = {
    id      : PropTypes.string.isRequired,
    label   : PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    visible : PropTypes.bool
  }
  static defaultProps = {
    visible: true
  }
  state = {
    value: ''
  };
  constructor(props) {
    super(props);
    this.onChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    let value = event.target.value;
    this.setState({value});
    this.props.onChange(value);
  }
  render() {
    return (
      <div>
        <label htmlFor={this.props.id}>
          {this.props.label}
        </label>
        <input
          className="form-control"
          id={this.props.id}
          type="search"
          value={this.state.value}
          onChange={this.handleChange.bind(this)}/>
      </div>
    );
  }
}