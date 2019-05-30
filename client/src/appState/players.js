import { FETCH_PLAYERS_SUCCESS } from './constants';

function mergePlayers(state, { players }) {
  return players;
}

export default function players(state = [], action) {
  switch (action.type) {
    case FETCH_PLAYERS_SUCCESS:
      return mergePlayers(state, action.payload.data);
    default:
      return state;
  }
}
