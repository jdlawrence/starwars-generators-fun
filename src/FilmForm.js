import React, { Component } from 'react';
import './FilmForm.scss';

class FilmForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      dirtyForm: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleBlur() {
    this.setState({
      dirtyForm: true,
    })
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    const formHasErrors = () => {
      return this.state.dirtyForm && !this.state.value.match(/\b[1-7]\b/);
    };
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
        { formHasErrors() ? (
          <p className="film-form__error">Please enter a number 1 through 7</p>
        ) : ''}

      </form>
    );
  }
}

export default FilmForm;