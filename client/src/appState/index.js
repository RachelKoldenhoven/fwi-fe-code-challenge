import { combineReducers } from 'redux';

import players from './players';
import { routerReducer } from 'redux-first-routing';
import pagination from './pagination';

export default combineReducers({
  players,
  router: routerReducer,
  pagination,
});
