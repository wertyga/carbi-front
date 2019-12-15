// Get data from server to fill stores
import Cookies from 'universal-cookie';

import { gfUser } from 'goldfish';
import { getDevice, updateUser } from 'redux/actions';
import { cookiesConstants } from 'redux/constants';

const { SAVE_ALL_COOKIES } = cookiesConstants;

const getDeviceType = async (req, rootStore) => {
  rootStore.dispatch(getDevice(req.headers))
};

export const collectCookies = (req, rootStore) => {
  const cookies = new Cookies(req.headers.cookie);
  const allCookies = cookies.getAll();

  rootStore.dispatch({
    type: SAVE_ALL_COOKIES,
    data: allCookies,
  });
  rootStore.dispatch(updateUser({ token: allCookies[gfUser.userToken] }));
};

export const getInitialState = async (req, rootStore) => {
  await Promise.all([
      getDeviceType(req, rootStore),
      collectCookies(req, rootStore),
  ]);
};
