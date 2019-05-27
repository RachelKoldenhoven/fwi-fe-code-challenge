import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Header from './Header/Header';
import PlayerTable from './PlayerTable/PlayerTable';
import PlayerAdd from './PlayerAdd/PlayerAdd';

const App = props => {
  const currentView = () => {
    if (props.url === '/players/add') {
      return <PlayerAdd />;
    } else return <PlayerTable />;
  };

  return (
    <Fragment>
      <Header />
      {currentView()}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    url: state.router.pathname,
  };
};

export default connect(mapStateToProps)(App);
