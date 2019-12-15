import { deviceConstants } from 'redux/constants';

const { SET_DEVICE } = deviceConstants;

export const deviceStore = (state = {}, { type, data }) => {
  switch(type) {
    case SET_DEVICE:
      return data;

    default:
      return state;
  }
};