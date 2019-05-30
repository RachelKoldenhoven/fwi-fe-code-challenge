import { TOGGLE_SORT } from './constants';

export default (state = { page: 0, col: 'name', dir: 'asc' }, action) => {
  if (action.type === TOGGLE_SORT) {
    const newState = toggleSort(state, action.col);
    console.log('state: ', state);
    console.log('newState: ', newState);
    return newState;
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
