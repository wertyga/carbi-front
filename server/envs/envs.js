const isProd = process.env.NODE_ENV === 'production';

const ENVIES_DEFAULTS = {
  dev: {
    API: 'http://localhost:3001/api',
  },
  prod: {
    API: 'http://46.101.247.117:8000',
  },
}

const getEnvies = () => {
  let envObject = {};
  const targetDefaults = isProd ? 'prod' : 'dev';
  Object.entries(ENVIES_DEFAULTS[targetDefaults]).forEach(([envName, envValue]) => {
    if (!!process.env[envName]) {

      envObject = { ...envObject, [envName]: JSON.stringify(process.env[envName]) };
      return;
    }
    envObject = { ...envObject, [envName]: JSON.stringify(envValue )};
    return;
  });
  return envObject;
};

const setEnvies = () => {
  Object.entries(getEnvies()).forEach(([env, value]) => {
    process.env[env] = value;
  })
}

module.exports = {
  getEnvies,
  setEnvies,
};
