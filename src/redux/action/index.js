export const LOGIN = 'LOGIN';
export const ADD_SCORE = 'ADD_SCORE';

export const login = (name, gravatarEmail) => ({
  type: LOGIN,
  gravatarEmail,
  name,
});

export const ACTION_ADD_SCORE = (score) => ({
  type: ADD_SCORE,
  score,
});
