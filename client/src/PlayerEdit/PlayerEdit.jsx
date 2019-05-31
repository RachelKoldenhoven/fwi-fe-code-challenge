import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push as pushRoute } from 'redux-first-routing';

import { COUNTRIES } from '../constants';
import { updatePlayer } from '../appState/actions';
import { deletePlayer } from '../appState/actions';

import './PlayerEdit.scss';

export class PlayerEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      country: '',
      winnings: 0,
      id: '',
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
    const response = await fetch(
      `http://localhost:3001/players/${this.selectedId}`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );
    if (response.status !== 200) {
      this.setState({ id: undefined });
    } else {
      const player = await response.json();
      this.setState(player);
    }
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

  onDelete = player => {
    this.props.deletePlayer(player);
  };

  render() {
    if (this.state.id === undefined) {
      return <div className="player-edit">Player not found</div>;
    }
    return (
      <div className="player-edit">
        <div className="container">
          <h3>Edit this player</h3>
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
            Save Changes
          </button>
          <button name="cancel" onClick={() => this.props.onCancel()}>
            Cancel
          </button>
          <button name="delete" onClick={() => this.onDelete(this.state)}>
            Delete Player
          </button>
        </div>
      </div>
    );
  }
}

PlayerEdit.propTypes = {
  updatePlayer: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  deletePlayer: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
  return {
    url: state.router.pathname,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePlayer: player => dispatch(updatePlayer(player)),
    onCancel: () => dispatch(pushRoute('/')),
    deletePlayer: player => dispatch(deletePlayer(player)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerEdit);
