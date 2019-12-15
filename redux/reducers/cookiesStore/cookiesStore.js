import { cookiesConstants } from 'redux/constants';
import Cookies from 'universal-cookie';

const { SET_COOKIE, SAVE_ALL_COOKIES } = cookiesConstants;

const MONTH_IN_SECONDS = 2592000;
const defaultOptions = {
  path: '/',
  maxAge: MONTH_IN_SECONDS,
};

export const cookiesStore = (state = {}, { type, data }) => {
  const cookies = new Cookies(state);

  switch(type) {
    case SET_COOKIE:
      console.log(data);
      const { name, value, opts = defaultOptions } = data;
      cookies.set(name, value, opts);
      return {
        ...state,
        [name]: value,
      };

    case SAVE_ALL_COOKIES:
      return data;

    default:
      return state;
  };

  return cookies.getAll();
};