import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'

import { rootReducer } from './reducers/rootReducer';

const devEnv = process.env.NODE_ENV === 'development';

export const initializeStore = (preloadedState = {}) => {
  return createStore(
    rootReducer,
    preloadedState,
    devEnv ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk),
  )
};

let reduxStore;
export const getOrInitializeStore = initialState => {
  // Always make a new store if server, otherwise state is shared between requests
  if (typeof window === 'undefined') {
    return initializeStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!reduxStore) {
    reduxStore = initializeStore(initialState);
  }

  return reduxStore;
};