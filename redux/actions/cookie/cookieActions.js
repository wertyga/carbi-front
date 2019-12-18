import { cookiesConstants } from 'redux/constants';

const { SET_COOKIE } = cookiesConstants;

export const setCookie = (name, value, opts) => ({ type: SET_COOKIE, data: { name, value, opts } });