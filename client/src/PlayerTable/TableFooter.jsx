import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { onChangePage } from '../appState/actions';

export class TableFooter extends Component {
  get pageTotal() {
    return Math.ceil(this.props.total / 25);
  }

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
              className="table__footer table__page"
              onClick={() => {
                this.props.changePage(this.props.page, -1, this.pageTotal);
              }}
            >
              ◀
            </td>
            <td className="table__footer">
              {this.props.page} / {this.pageTotal}
            </td>
            <td
              className="table__footer table__page"
              onClick={() => {
                this.props.changePage(this.props.page, 1, this.pageTotal);
              }}
            >
              ▶
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }
}

TableFooter.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    page: state.pagination.page,
    total: state.players.total,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changePage: (currPage, offset, pageTotal) => {
      dispatch(onChangePage(currPage, offset, pageTotal));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableFooter);
