export const LOGIN = 'LOGIN';
export const ADD_SCORE = 'ADD_SCORE';
export const SAVE_HASH = 'SAVE_HASH';
export const RESET_SCORE = 'RESET_SCORE';

export const login = (name, gravatarEmail) => ({
  type: LOGIN,
  gravatarEmail,
  name,
});

export const ACTION_ADD_SCORE = (score) => ({
  type: ADD_SCORE,
  score,
});

export const ACTION_SAVE_HASH = (gravatarHash) => ({
  type: SAVE_HASH,
  gravatarHash,
});

export const ACTION_RESET_SCORE = () => ({
  type: RESET_SCORE,
});
