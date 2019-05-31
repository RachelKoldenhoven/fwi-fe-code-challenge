import { FETCH_PLAYERS_SUCCESS } from './constants';

function mergePlayers(state, { players, total }) {
  return { ...state, players: players, total: total };
}

export default function players(state = { players: [], total: 0 }, action) {
  switch (action.type) {
    case FETCH_PLAYERS_SUCCESS:
      return mergePlayers(state, action.payload.data);
    default:
      return state;
  }
}
