import { combineReducers } from 'redux';

import playerIds from './playerIds';
import players from './players';
import { routerReducer } from 'redux-first-routing';
import pagination from './pagination';

export default combineReducers({
  playerIds,
  players,
  router: routerReducer,
  pagination,
});
