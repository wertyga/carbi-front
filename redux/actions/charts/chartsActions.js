import { saveUserTrading, deleteChart } from './helpers';
import { chartsConstants, errorConstants } from 'redux/constants';
import { getPriceByPairsMarkets } from 'redux/actions';

import * as api from './api';

const { ADD_CHART, SAVE_CHARTS, DELETE_CHART, UPDATE_CHART } = chartsConstants;
const { SET_ERROR } = errorConstants;

const isPricesNotExist = ({ markets, pair, prices }) => {
  if (!prices[pair]) return { pair, markets };

  const marketsKeysPrices = Object.keys(prices[pair]);
  const isHaveNoPriceMarket = markets.find(market => !marketsKeysPrices.includes(market));
  if (isHaveNoPriceMarket) return { pair, markets };

  return false;
};

const getEmptyPairsPrices = async (dispatch, marketsPairs, prices) => {
  const marketsPairsObj = isPricesNotExist({
    markets: marketsPairs.markets,
    pair: marketsPairs.pair,
    prices,
  });

  if (marketsPairsObj) {
    // await getPriceByPairsMarkets(dispatch, [marketsPairsObj]);
  }
};

export const addChart = async ({ dispatch, marketsPairs, prices, token }) => {
  // saveUserTrading(marketsPairs);
  try {
    const { data } = await api.fetchPostChart(marketsPairs, token);
    await getEmptyPairsPrices(dispatch, marketsPairs, prices);

    dispatch({
      type: ADD_CHART,
      data: marketsPairs,
    });
  } catch (e) {
    console.error(e);
  }
};

export const updateChart = async (dispatch, marketsPairs, prices) => {
  const { chartId } = marketsPairs;
  saveUserTrading(marketsPairs, 'update');

  await getEmptyPairsPrices(dispatch, marketsPairs, prices);

  dispatch({
    type: UPDATE_CHART,
    data: marketsPairs,
    chartId,
  });
};

export const saveCharts = (marketsPairs) => {
  return {
    type: SAVE_CHARTS,
    data: marketsPairs,
  };
};

export const deleteChartAction = (chartId) => {
  deleteChart(chartId);
  return {
    type: DELETE_CHART,
    data: {
      chartId,
    },
  };
};

export const getUserCharts = async (dispatch, prices, token) => {
  try {
    const { data } = await api.fetchCharts(token);
    const modifiedData = data.map(item => ({ chartId: item.id, ...item }));

    await getEmptyPairsPrices(dispatch, modifiedData, prices);
    // dispatch({
    //   type: SAVE_CHARTS,
    //   data: modifiedData,
    // });
  } catch (e) {
    console.log(e);
    dispatch({
      type: SET_ERROR,
      userStoreError: e.message,
    });
  }
};