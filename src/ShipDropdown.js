import React, { Component } from 'react';
import { getListOfShips } from './starWarsAPI';
import './ShipDropdown.scss';

class ShipDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ships: ['dummy'],
      value: 'placeholder',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    getListOfShips((ships) => {
      this.setState({
        ships,
      })
    });
  }

  handleChange(event) {
    const val = event.target.value;
    this.props.getShip(this.state.ships[val]);
    this.setState({value: val});
  }

  render() {
    return (
      <select
        className="ship-dropdown__main-element"
        value={this.state.value}
        onChange={this.handleChange}
      >
        {this.state.ships.map((ship, index) =>
        <option key={index} value={index} >{ship.name}</option>
        )}
      </select>
    );
  }
}

export default ShipDropdown;