import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'redux-first-routing';

import { toggleSort } from '../appState/actions';

export class TableHeader extends Component {
  render() {
    return (
      <table
        id="player-table-header"
        role="presentation"
        className="table table--fixed"
      >
        <thead>
          <tr role="row">
            <th role="columnheader" className="table__header table__avatar">
              <button className="table__player__add" onClick={this.props.onAdd}>
                +
              </button>
            </th>
            <th
              role="columnheader"
              className="table__header table__player"
              onClick={() => this.props.toggleSort('name')}
            >
              Player
            </th>
            <th
              role="columnheader"
              className="table__header table__winnings"
              onClick={() => this.props.toggleSort('winnings')}
            >
              Winnings
            </th>
            <th
              role="columnheader"
              className="table__header table__native"
              onClick={() => this.props.toggleSort('country')}
            >
              Native of
            </th>
          </tr>
        </thead>
      </table>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAdd: () => dispatch(push('/players/add')),
    toggleSort: col => dispatch(toggleSort(col)),
  };
};

export default connect(
  undefined,
  mapDispatchToProps
)(TableHeader);
