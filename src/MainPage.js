import React, { Component } from 'react';
import { getFilmInfo } from './starWarsAPI';
import FilmForm from './FilmForm';
import ShipDropdown from './ShipDropdown';
import './MainPage.scss';

class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      film: undefined,
      characters: [],
      loading: false,
      ships: [1, 2, 3, 4],
      firstShip: {},
      secondShip: {},
      displayShipInfo: false,
    }

    this.makeAPIRequest = this.makeAPIRequest.bind(this);
    this.getFirstShip = this.getFirstShip.bind(this);
    this.getSecondShip = this.getSecondShip.bind(this);
    this.compareShips = this.compareShips.bind(this);
    this.compareShipVals = this.compareShipVals.bind(this);
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

  getFirstShip(ship) {
    this.setState({
      firstShip: ship,
      displayShipInfo: false,
    });
  }

  getSecondShip(ship) {
    this.setState({
      secondShip: ship,
      displayShipInfo: false,
    });
  }

  compareShips() {
    this.setState({ displayShipInfo: true })
  }

  compareShipVals(shipProp, shipColumn) {
    const val1 = parseInt(this.state.firstShip[shipProp]);
    const val2 = parseInt(this.state.secondShip[shipProp]);

    if (shipColumn === 1) {
      if (val1 > val2) {
        return 'main-page--highlighted';
      } else if (val2 > val1) {
        return '';
      }
    } else if (shipColumn === 2) {
      if (val2 > val1) {
        return 'main-page--highlighted';
      } else if (val1 > val2) {
        return ''
      }
    } else {
      return '';
    }


  }
  render() {
    return (
      <div className="main-page__container">
        <div className="main-page__films-characters">
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
        <div className="main-page__ships">
          <div className="main-page__dropdowns-compare">
            <h2>Select two Starships from the dropdown lists to compare</h2>
            <ShipDropdown getShip={this.getFirstShip}></ShipDropdown>
            <ShipDropdown getShip={this.getSecondShip}></ShipDropdown>
            <button onClick={this.compareShips}>Compare</button>
          </div>
          <div className="main-page__ship-display">
            <table>
              <tbody>
                <tr className="main-page__ship-display--first-row">
                  <th className="main-page__ship-display--first-column"></th>
                  <th>Starship 1</th>
                  <th>Starship 2</th>
                </tr>
                <tr>
                  <th>Name</th>
                  <th>{this.state.displayShipInfo ? this.state.firstShip.name : ''}</th>
                  <th>{this.state.displayShipInfo ? this.state.secondShip.name : ''}</th>
                </tr>
                <tr>
                  <th>Cost</th>
                  <th className={this.state.displayShipInfo ? this.compareShipVals('cost_in_credits', 1) : ''}
                  >{this.state.displayShipInfo ? this.state.firstShip.cost_in_credits: ''}</th>
                  <th className={this.state.displayShipInfo ? this.compareShipVals('cost_in_credits', 2) : ''}
                  >{this.state.displayShipInfo ? this.state.secondShip.cost_in_credits: ''}</th>
                </tr>
                <tr>
                  <th>Speed</th>
                  <th className={ this.state.displayShipInfo ? this.compareShipVals('max_atmosphering_speed', 1) : ''}
                  >{this.state.displayShipInfo ? this.state.firstShip.max_atmosphering_speed : ''}</th>
                  <th className={ this.state.displayShipInfo ? this.compareShipVals('max_atmosphering_speed', 2) : ''}
                  >{this.state.displayShipInfo ? this.state.secondShip.max_atmosphering_speed : ''}</th>
                </tr>
                <tr>
                  <th>Cargo Size</th>
                  <th className={ this.state.displayShipInfo ? this.compareShipVals('cargo_capacity', 1) : ''}
                  >{this.state.displayShipInfo ? this.state.firstShip.cargo_capacity : ''}</th>
                  <th className={ this.state.displayShipInfo ? this.compareShipVals('cargo_capacity', 2) : ''}
                  >{this.state.displayShipInfo ? this.state.secondShip.cargo_capacity : ''}</th>
                </tr>
                <tr>
                  <th>Passengers</th>
                  <th className={ this.state.displayShipInfo ? this.compareShipVals('passengers', 1) : ''}
                  >{this.state.displayShipInfo ? this.state.firstShip.passengers : ''}</th>
                  <th className={ this.state.displayShipInfo ? this.compareShipVals('passengers', 2) : ''}
                  >{this.state.displayShipInfo ? this.state.secondShip.passengers : ''}</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default MainPage;