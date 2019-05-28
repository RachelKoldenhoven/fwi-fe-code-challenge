import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push as pushRoute } from 'redux-first-routing';

import { COUNTRIES } from '../constants';
import { updatePlayer } from '../appState/actions';

import './PlayerEdit.scss';

class PlayerEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      country: '',
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

  async componentDidMount() {
    const request = await fetch(
      `http://localhost:3001/players/${this.selectedId}`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );
    const player = await request.json();
    this.setState(player);
  }

  get selectedId() {
    const playerId = this.props.url;
    return playerId.substring(playerId.lastIndexOf('/') + 1);
  }

  onChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ ...this.state, [name]: value });
  };

  onSave = player => {
    player.winnings = parseInt(player.winnings, 10);
    this.props.updatePlayer(player);
  };

  render() {
    return (
      <div className="player-edit">
        <h3>Edit this player</h3>
        <label>
          Player Name:
          <input onChange={this.onChange} name="name" value={this.state.name} />
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
    );
  }
}

const mapStateToProps = state => {
  return {
    url: state.router.pathname,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePlayer: player => dispatch(updatePlayer(player)),
    onCancel: () => dispatch(pushRoute('/')),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerEdit);
