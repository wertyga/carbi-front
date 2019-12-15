import { userConstants } from '../../constants/index';

const { UPDATE_USER, CREATE_NEW_USER } = userConstants;

const initialState = {
  username: '',
  email: '',
};

export const userStore = (state = initialState, { type, data }) => {
  switch(type) {
    case UPDATE_USER:
      return {
        ...state,
        ...data,
      };

    case CREATE_NEW_USER:
      return data;

    default:
      return state;
  }
}