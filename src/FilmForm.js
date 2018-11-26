import React, { Component } from 'react';
import './FilmForm.scss';

class FilmForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      hasErrors: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.formHasErrors = this.formHasErrors.bind(this);
  }

  handleBlur() {
    this.setState({
      dirtyForm: true,
      hasErrors: this.formHasErrors(this.state.value),
    })
  }

  handleChange(event) {
    const val = event.target.value;
    this.setState({
      value: val,
      hasErrors: val.length > 0 ? this.formHasErrors(val) : false,
    });
  }

  handleSubmit(event) {
    if (this.state.hasErrors) {
      event.preventDefault();
      return;
    }
    this.props.makeAPIRequest(this.state.value);
    event.preventDefault();
  }

  formHasErrors(val) {
    return !val.match(/\b[1-7]\b/);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
        </label>
        <input type="submit" value="Submit" />
        { this.state.hasErrors ? (
          <p className="film-form__error">Please enter a number 1 through 7</p>
        ) : ''}

      </form>
    );
  }
}

export default FilmForm;