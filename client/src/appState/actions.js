import { push as pushRoute } from 'redux-first-routing';

import { FETCH_PLAYERS_SUCCESS } from './constants';

export function fetchPlayersSuccess(data) {
  return { type: FETCH_PLAYERS_SUCCESS, payload: { data } };
}

export const getPlayers = () => {
  return async dispatch => {
    const request = await fetch('http://localhost:3001/players', {
      headers: {
        Accept: 'application/json',
      },
    });
    const players = await request.json();
    const action = fetchPlayersSuccess(players);
    dispatch(action);
  };
};

export const savePlayer = player => {
  return async dispatch => {
    await fetch('http://localhost:3001/players', {
      method: 'POST',
      body: JSON.stringify(player),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch(getPlayers());
    dispatch(pushRoute('/'));
  };
};

export const updatePlayer = player => {
  return async dispatch => {
    await fetch(`http://localhost:3001/players/${player.id}`, {
      method: 'PATCH',
      body: JSON.stringify(player),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch(getPlayers());
    dispatch(pushRoute('/'));
  };
};

export const deletePlayer = player => {
  return async dispatch => {
    await fetch(`http://localhost:3001/players/${player.id}`, {
      method: 'DELETE',
    });
    dispatch(getPlayers());
    dispatch(pushRoute('/'));
  };
};

export const onSelectPlayer = playerId => {
  return dispatch => {
    dispatch(pushRoute(`/players/${playerId}`));
  };
};
