import types from '../actions/types';

let INITIAL_STATE = {
  email: '',
  password: '',
  phoneNumber: '',
  avatar: null,
  name: '',
  token: null,
};

export default function accountReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SAVE_INFO_USER:
      return {
        ...state,
        ...action.data,
      };
    case types.SAVE_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
}
