import { errorConstants } from '../../constants';

const { SET_ERROR } = errorConstants;

export const setErrorAction = (data) => ({
  type: SET_ERROR,
  data,
});

export const setUserError = (userStoreError) => setErrorAction({ userStoreError });
