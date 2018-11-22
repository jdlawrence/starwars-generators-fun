import React, { Component } from 'react';
import FilmForm from './FilmForm';
import './MainPage.scss';

class MainPage extends Component {
  render() {
    return (
      <div>
        <h2 className="main-page__film-header">Enter Film Number (1-7)</h2>
        <FilmForm></FilmForm>
        <div>
          <h5>Film</h5>
        </div>
        <div>
          <h5>Characters</h5>
        </div>
      </div>
    )
  }
}

export default MainPage;