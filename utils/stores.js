// Get data from server to fill stores
import Cookies from 'universal-cookie';

import { gfUser } from 'goldfish';
import { getDevice, getUser } from 'redux/actions';
import { cookiesConstants } from 'redux/constants';

const { SAVE_ALL_COOKIES } = cookiesConstants;

const fetchUser = async (rootStore) => {
  const token = rootStore.getState().cookiesStore[gfUser.userToken];
  if (!token) return;

  try {
    const userData = await getUser(token);
    rootStore.dispatch(userData);
  } catch (e) {
    // ...
  }
};

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
};

export const getInitialState = async (req, rootStore) => {
  await collectCookies(req, rootStore);

  await Promise.all([
    getDeviceType(req, rootStore),
    fetchUser(rootStore),
  ]);
};
