import _uniq from 'lodash/uniq';

export const getMarkets = (data = {}, chosenMarkets) => {
  const names = Object.keys(data);

  return names.map(name => ({
    name,
    checked: chosenMarkets.includes(name),
  }));
};

export const getPairs = (data = {}, chosenPair, chosenMarkets) => {
  if (chosenMarkets.length < 2) return [];

  const pairs = Object.values(data).reduce((init, { pairs = [] } = {}) => ([
    ...init,
    ...pairs.map(({ name }) => name),
  ]), []);

  const uniqPairs =  _uniq(pairs);
  return uniqPairs.filter(symbol => {
    return chosenMarkets.every(market => {
      const pairs = data[market].pairs.map(({ name }) => name);
      return pairs.includes(symbol);
    });
  })
    .map(symbol => ({ name: symbol, checked: chosenPair === symbol, disabled: false }));
};

export const getComparePairsFormMarkets = (data = {}, chosenMarkets) => {
  const markets = chosenMarkets.reduce((init, marketName) => ({
    ...init,
    [marketName]: data[marketName],
  }), {});

  const marketsPairs = getAllPairs(markets);

  return chosenMarkets.reduce((init, marketName) => {
    const market = data[marketName];
    if (!market) return init;

    const pairs = data[marketName].pairs.map(({ name }) => name);

    return init.filter(item => pairs.includes(item));
  }, marketsPairs);
};
