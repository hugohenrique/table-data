import React, {Component} from 'react';

export default class SearchField extends Component {
  constructor(...props) {
    super(...props);
    this.state    = {value: ''};
    this.onChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let value = event.target.value;
    this.setState({value: value});
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
          onChange={this.handleChange.bind(this)}
        />
      </div>
    );
  }
}
