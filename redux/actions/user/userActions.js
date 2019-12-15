import { gfUser } from 'goldfish';

import * as api from './api';
import { userConstants, errorConstants , cookiesConstants} from '../../constants';

const { UPDATE_USER, CREATE_NEW_USER } = userConstants;
const { SET_ERROR } = errorConstants;
const { SET_COOKIE } = cookiesConstants;

export const updateUser = data => ({ type: UPDATE_USER, data });

export const clearUserError = () => ({
  type: SET_ERROR,
  data: {
    userStoreError: undefined,
  },
});

// export const getUserPassword = async (username) => {
//   try {
//     await api.fetchUserPassword(username);
//
//     return {
//       type: UPDATE_USER,
//       data: {
//         username,
//       },
//     };
//   } catch (e) {
//     throw e.message;
//   }
// };

export const submitUser = async (dispatch, userData) => {
  try {
    const { data: { data: { username, first_name, last_name, token } } } = await api.fetchUserData(userData);

    dispatch({
      type: CREATE_NEW_USER,
      data: {
        username: username,
        first_name,
        last_name,
      },
    });
    dispatch({
      type: SET_COOKIE,
      data: {
        name: gfUser.userToken,
        value: token,
      },
    });
  } catch (e) {
    dispatch({
      type: SET_ERROR,
      data: {
        userStoreError: getServerError(e),
      },
    });
    throw e;
  }
};


