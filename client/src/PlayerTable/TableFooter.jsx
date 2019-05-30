import React, { Component } from 'react';
import { connect } from 'react-redux';

import { onChangePage } from '../appState/actions';

class TableFooter extends Component {
  render() {
    return (
      <table
        id="player-table-footer"
        role="presentation"
        className="table table--footer"
      >
        <tfoot>
          <tr>
            <td
              className="table__footer"
              onClick={() => this.props.changePage(-1)}
            >
              ◀
            </td>
            <td className="table__footer">{this.props.page}</td>
            <td
              className="table__footer"
              onClick={() => this.props.changePage(1)}
            >
              ▶
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }
}

const mapStateToProps = state => {
  return {
    page: state.pagination.page,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changePage: val => dispatch(onChangePage(val)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableFooter);