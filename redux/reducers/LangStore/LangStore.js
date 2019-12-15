import { langConstants } from 'redux/constants';

const languages = ['en', 'ru'];
const { SWITCH_LANG }  = langConstants;

export const menuStore = (state = languages[0], { type, data }) => {
  switch(type) {
    case SWITCH_LANG:
      return data;

    default:
      return state;
  }
}