import { LOGIN, ADD_SCORE, SAVE_HASH, RESET_SCORE } from '../action';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  gravatarHash: '',
};

export default function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state, name: action.name, gravatarEmail: action.gravatarEmail };
  case ADD_SCORE:
    return {
      ...state, score: state.score + action.score, assertions: state.assertions + 1,
    };
  case SAVE_HASH:
    return { ...state, gravatarHash: action.gravatarHash };
  case RESET_SCORE:
    return { ...state, score: 0, assertions: 0 };
  default:
    return state;
  }
}
