const withCSS = require('@zeit/next-css');
const withSASS = require('@zeit/next-sass');
const path = require('path');
const ENVS = require('./server/envs/envs');

module.exports = withCSS(withSASS({
  sassLoaderOptions: {
    includePaths: ['assets/css'],
  },
  webpack: (config, { webpack, defaultLoaders }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        React: 'react',
        PropTypes: 'prop-types',
        classnames: 'classnames',
      }),
      new webpack.DefinePlugin({
        'process.env': ENVS.getEnvies(),
      })
    );
    return config;
  },
}));