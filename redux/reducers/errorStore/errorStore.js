import { errorConstants } from '../../constants';

const { SET_ERROR } = errorConstants;

export const errorStore = (state = {}, { type, data }) => {
  switch(type) {
    case SET_ERROR:
      return {
        ...state,
        ...data,
      };

    default:
      return state;
  }
}