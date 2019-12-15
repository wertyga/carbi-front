import _isEmpty from 'lodash/isEmpty';

export const getMarkets = (markets, pair, prices) => (
  markets.map(market => ({
    market,
    price: prices[pair][market],
  }))
);

export const getMarketsPrices = (markets, pair, prices) => {
  if (!markets.length || !pair || _isEmpty(prices)) return [];
  let min = Infinity;
  let max = 0;

  const chartsMarkets = getMarkets(markets, pair, prices);

  chartsMarkets.forEach(({ market, price }) => {
    if (price < min) {
      min = market;
    } else if (price > max) {
      max = market;
    }
  });

  return chartsMarkets.map(({ market, price }) => ({
    market,
    price,
    color: min === market ? 'red' : (max === market ? 'green' : undefined),
  }));
};

export const collectChartData = (markets, pair, prices) => {
  if (!markets.length || !pair || _isEmpty(prices)) return [];

  const chart = [
    ['Pair', ...markets],
    [pair, ...markets.map(market => prices[pair][market])],
  ]

  return {
    chart,
    options: {
      legend: {
        position: 'none',
      },
      backgroundColor: '#1b1c1d',
    },
  };
}
