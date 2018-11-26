import React, { Component } from 'react';
import { getFilmInfo } from './starWarsAPI';
import FilmForm from './FilmForm';
import './MainPage.scss';

class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      film: undefined,
      characters: [],
      loading: false,
    }

    this.makeAPIRequest = this.makeAPIRequest.bind(this);
  }
  makeAPIRequest(movieNumber) {
    this.setState({
      film: undefined,
      characters: [],
      loading: true,
    });
    getFilmInfo(movieNumber, (result) => {
      this.setState({
        loading: false,
        film: result.movieInfo.title,
        characters: [...result.characterInfo],
      });
    });
  }
  render() {
    return (
      <div>
        <h2 className="main-page__film-header">Enter Film Number (1-7)</h2>
        <FilmForm makeAPIRequest={this.makeAPIRequest}></FilmForm>
        <div>
          <h5>Film</h5>
          {this.state.loading ? <p>LOADING!</p> : '' }
          <p>{this.state.film}</p>
        </div>
        <div>
          <h5>Characters</h5>
          {this.state.loading ? <p>LOADING!</p> : '' }
          {this.state.characters.map((character, index) =>
            <div key={index}>
              <span>{character.name}</span>
            </div>
          )
          }
        </div>
      </div>
    )
  }
}

export default MainPage;