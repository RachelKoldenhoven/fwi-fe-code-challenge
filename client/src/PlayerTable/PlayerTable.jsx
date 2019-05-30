import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
    this.props.getPlayers(0, 'name', 'asc');
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

const mapStateToProps = state => {
  return {
    players: state.players,
    pagination: state.pagination,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPlayers: (page, col, dir) => dispatch(getPlayers(page, col, dir)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerTable);
