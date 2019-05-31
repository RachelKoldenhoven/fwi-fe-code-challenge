import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push as pushRoute } from 'redux-first-routing';

import { COUNTRIES } from '../constants';
import { savePlayer } from '../appState/actions';

import './PlayerAdd.scss';

class PlayerAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      country: 'NL',
      winnings: 0,
    };
  }

  get options() {
    let options = [];
    for (const country in COUNTRIES) {
      options.push(
        <option value={country} key={country}>
          {COUNTRIES[country]}
        </option>
      );
    }
    return options;
  }

  onChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ ...this.state, [name]: value });
  };

  onSave = player => {
    player.winnings = parseInt(player.winnings, 10);
    this.props.savePlayer(player);
  };

  render() {
    return (
      <div className="player-add">
        <div className="container">
          <h3>Add a player</h3>
          <label>
            Player Name:
            <input
              onChange={this.onChange}
              name="name"
              value={this.state.name}
            />
          </label>
          <label>
            Country:
            <select
              onChange={this.onChange}
              name="country"
              value={this.state.country}
            >
              {this.options}
            </select>
          </label>
          <label>
            Winnings:
            <input
              onChange={this.onChange}
              name="winnings"
              value={this.state.winnings}
            />
          </label>
          <button name="save" onClick={() => this.onSave(this.state)}>
            Save Player
          </button>
          <button name="cancel" onClick={() => this.props.onCancel()}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

PlayerAdd.propTypes = {
  savePlayer: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    savePlayer: player => dispatch(savePlayer(player)),
    onCancel: () => dispatch(pushRoute('/')),
  };
};

export default connect(
  undefined,
  mapDispatchToProps
)(PlayerAdd);
