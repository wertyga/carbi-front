import _uniq from 'lodash/uniq';

import { pairsMarketsConstants, errorConstants } from 'redux/constants';

const { SET_PAIRS_MARKETS, SET_PAIRS_PRICE } = pairsMarketsConstants;
const { SET_ERROR } = errorConstants;

import * as api from './api';

export const getMarketsWithPairs = async (token) => {
  try {
    const { data: { data } } = await api.fetchMarketsPairs(token);

    const dataObj = Object.entries(data)
      .reduce((init, [key, pairs]) => ({
        ...init,
        [key]: {
          pairs: pairs.map(name => ({ name, icon: ''  })),
        },
      }), {});

    return {
      type: SET_PAIRS_MARKETS,
      data: {
        marketsPairs: dataObj,
      },
    };
  } catch (e) {
    return {
        type: SET_ERROR,
        data: {
          marketsPairs: e.message,
        },
      };
  }
};

export const getPriceByPairsMarkets = async (dispatch, marketsPairs) => {
  if (!marketsPairs || !marketsPairs.length) return;

  const collectedPairs = [];
  const collectedMarkets = [];
  marketsPairs.forEach(({ markets, pair }) => {
    collectedPairs.push(pair);
    collectedMarkets.push(...markets);
  });

  const pairs = _uniq(collectedPairs);
  const markets = _uniq(collectedMarkets);

  try {
    const { data } = await api.fetchPriceMarketsPairs({ markets, pairs });

    dispatch({
      type: SET_PAIRS_PRICE,
      data,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: SET_ERROR,
      data: {
        marketsPairs: e.message,
      },
    });
  }
};
