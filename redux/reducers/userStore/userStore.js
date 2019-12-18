import { userConstants } from 'redux/constants';

const { UPDATE_USER, USER_SIGN_IN, SET_USER_ERROR } = userConstants;

const initialState = {
  error: '',
};

export const userStore = (state = initialState, { type, data }) => {
  switch(type) {
    case UPDATE_USER:
    case USER_SIGN_IN:
      return {
        ...state,
        ...data,
      };

    case SET_USER_ERROR:
      return {
        ...state,
        error: data,
      };

    default:
      return state;
  }
}