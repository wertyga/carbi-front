import axios from 'axios';

export const fetchUser = (token) => (
  axios({
    method: 'get',
    url: `${process.env.API}/user/get-user`,
    params: {
      token,
    },
  })
);

export const fetchUserData = (data) => (
  axios({
    method: 'post',
    url: `${process.env.API}/user/sign-in`,
    data,
  })
);