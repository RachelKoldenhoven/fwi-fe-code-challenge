import { TOGGLE_SORT } from './constants';

export default (state = { page: 0, col: 'name', dir: 'asc' }, action) => {
  if (action.type === TOGGLE_SORT) {
    return toggleSort(state, action.col);
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
