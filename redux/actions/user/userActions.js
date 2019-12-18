import { gfUser } from 'goldfish';

import { userConstants } from 'redux/constants';
import { setCookie } from 'redux/actions';

import * as api from './api';

const { UPDATE_USER, USER_SIGN_IN, SET_USER_ERROR } = userConstants;

export const updateUser = data => ({ type: UPDATE_USER, data });
export const setUser = data => ({ type: USER_SIGN_IN, data });
export const setUserError = data => ({ type: SET_USER_ERROR, data });
export const clearUserError = () => ({ type: SET_USER_ERROR, data: '' });

export const getUser = async (userToken) => {
  try {
    const { data: { data: { token, ...rest } } }= await api.fetchUser(userToken);

    return setUser(rest);
  } catch (e) {
    // ...
  }
};

export const submitUser = async (dispatch, userData) => {
  try {
    const { data: { data: { token, ...rest } } } = await api.fetchUserData(userData);

    dispatch(setUser(rest));
    dispatch(setCookie(gfUser.userToken, token));
  } catch (e) {
    console.log(e);
    dispatch(setUserError(getServerError(e).message));
    throw e;
  }
};


