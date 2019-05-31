import { TOGGLE_SORT, CHANGE_PAGE } from './constants';

export default (state = { page: 1, col: 'name', dir: 'asc' }, action) => {
  if (action.type === TOGGLE_SORT) {
    return toggleSort(state, action.col);
  }
  if (action.type === CHANGE_PAGE) {
    return changePage(state, action.page);
  }
  return state;
};

const toggleSort = (state, col) => {
  if (col === state.col) {
    const dir = state.dir === 'asc' ? 'desc' : 'asc';
    return { ...state, dir };
  } else {
    return { ...state, col };
  }
};

const changePage = (state, page) => {
  return { ...state, page };
};
