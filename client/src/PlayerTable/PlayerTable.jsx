import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { COUNTRIES } from '../constants';
import { getPlayers } from '../appState/actions';

import './PlayerTable.scss';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';

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
    pagination: PropTypes.shape({
      page: PropTypes.number.isRequired,
      col: PropTypes.string.isRequired,
      dir: PropTypes.string.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    this.props.getPlayers(
      this.props.pagination.page,
      this.props.pagination.col,
      this.props.pagination.dir
    );
  }

  componentWillReceiveProps(props) {
    if (
      props.pagination.page === this.props.pagination.page &&
      props.pagination.col === this.props.pagination.col &&
      props.pagination.dir === this.props.pagination.dir
    )
      return;
    this.props.getPlayers(
      props.pagination.page,
      props.pagination.col,
      props.pagination.dir
    );
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
        <TableFooter />
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
