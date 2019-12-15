import App from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';

import { Meta } from 'components/Common/Meta/Meta';
import { gfCommon } from 'goldfish';

import { getInitialState } from 'utils';
import { getOrInitializeStore } from 'redux/initializeStore';

import 'assets/css/global.scss';
import 'assets/globals';

const createBrowserHistory = require('history').createBrowserHistory; // eslint-disable-line
let history;
if (typeof document !== 'undefined') {
  history = createBrowserHistory();
};

export default class NewApp extends App {
  static async getInitialProps(appContext) {
    const { ctx: { req } } = appContext;

    const rootStore = getOrInitializeStore();
    const [reduxStoreData = {}, appProps] = await Promise.all([
      req && getInitialState(req, rootStore),
      App.getInitialProps(appContext),
    ]);

    return {
      ...appProps,
      reduxStoreData: rootStore.getState(),
    };
  }

  constructor(props) {
    super(props);

    this.reduxStore = getOrInitializeStore(props.reduxStoreData);
  }

  render() {
    const { Component, pageProps } = this.props;
    const { isMobile } = this.reduxStore.getState().deviceStore;

    return (
      <Provider store={this.reduxStore}>
        <Head>
          <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
          <link rel="shortcut icon" href="/static/favicon.png" type="image/png" />
        </Head>
        <Meta
          title={gfCommon.pageTitle.en}
          description={gfCommon.pageDescription.en}
        />
        <Component {...pageProps} isMobile={isMobile} />
      </Provider>
    );
  }
};