import { LOGIN, ADD_SCORE } from '../action';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

export default function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state, name: action.name, gravatarEmail: action.gravatarEmail };
  case ADD_SCORE:
    return { ...state, score: action.score };
  default:
    return state;
  }
}
