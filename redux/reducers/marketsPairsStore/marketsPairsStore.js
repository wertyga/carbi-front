import { pairsMarketsConstants } from 'redux/constants';

const { SET_PAIRS_MARKETS, SET_PAIRS_PRICE } = pairsMarketsConstants;

const initialState = {
  marketsPairs: {},
  prices: {},
};

export const marketsPairsStore = (state = initialState, { type, data }) => {
  switch(type) {
    case SET_PAIRS_MARKETS:
      return {
        ...state,
        ...data,
      };

    case SET_PAIRS_PRICE:
      return {
        ...state,
        prices: {
          ...state.prices,
          ...data,
        },
      };

    default:
      return state;
  }
}