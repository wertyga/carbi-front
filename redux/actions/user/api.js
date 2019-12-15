import axios from 'axios';

export const fetchUserPassword = (login) => (
  axios({
    method: 'post',
    url: `${process.env.API}/send-password`,
    data: {
      login,
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