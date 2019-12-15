import axios from 'axios';

export const fetchMarketsPairs = (token) => (
  axios({
    method: 'get',
    url: `${process.env.API}/data/markets-pairs`,
    // data: {
      // markets: 'ALL',
    // },
    params: {
      token,
    },
  })
);

export const fetchPriceMarketsPairs = ({ markets, pairs }) => {
  return axios({
    method: 'post',
    url: `${process.env.API}/data-pairs`,
    data: {
      pairs,
      markets,
      prices: 1,
    },
  })
};
