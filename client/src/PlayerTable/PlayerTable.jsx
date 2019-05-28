import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connectAdvanced } from 'react-redux';
import shallowEqual from 'shallowequal';

import { COUNTRIES } from '../constants';
import { getPlayers } from '../appState/actions';

import './PlayerTable.scss';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

class PlayerTable extends PureComponent {
  static propTypes = {
    players: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        country: PropTypes.oneOf(Object.keys(COUNTRIES)),
        winnings: PropTypes.number.isRequired,
        imageUrl: PropTypes.string.isRequired,
      })
    ).isRequired,
    getPlayers: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getPlayers();
  }

  render() {
    const { players } = this.props;
    return (
      <div
        id="player-table-grid"
        role="grid"
        aria-label="Poker Players"
        className="player-table"
      >
        <TableHeader />
        <TableBody players={players} />
      </div>
    );
  }
}

export default connectAdvanced(dispatch => {
  let result;
  const actions = bindActionCreators({ getPlayers }, dispatch);

  return (state, props) => {
    const players = state.playerIds.map(id => state.players[id]);

    const nextResult = { ...props, ...actions, players };

    if (!shallowEqual(result, nextResult)) {
      result = nextResult;
    }

    return result;
  };
})(PlayerTable);
