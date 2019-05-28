import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'redux-first-routing';

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
            <th role="columnheader" className="table__header table__player">
              Player
            </th>
            <th role="columnheader" className="table__header table__winnings">
              Winnings
            </th>
            <th role="columnheader" className="table__header table__native">
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
  };
};
export default connect(
  undefined,
  mapDispatchToProps
)(TableHeader);
