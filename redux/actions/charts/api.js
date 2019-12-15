import axios from 'axios';

export const fetchCharts = (token) => (
  axios({
    method: 'get',
    url: `${process.env.API}/manage-signals`,
    headers: { token },
  })
);

export const fetchPostChart = ({ markets, pair }, token) => (
  axios({
    method: 'post',
    url: `${process.env.API}/manage-signals`,
    headers: { token },
    data: {
      markets,
      pair,
      difference: 0,
      status: 0,
    },
  })
);

// export const fetchAddChart = () => ();