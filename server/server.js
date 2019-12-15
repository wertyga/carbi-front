import express from 'express';
import next from 'next';
import bodyParser from 'body-parser'

const ENVS = require('./envs/envs');
import { api } from './api';
const config = require('./common/config');
const iniGC = require('./helpers');

// import './common/mongoose'

const PORT = process.env.PORT || config.PORT;
const dev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';

const app = next({
  dev,
  dir: dev ? '.' : 'public/client',
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  ENVS.setEnvies();
  if(prod) iniGC();

  server.use(bodyParser.json());

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.use('/api', api);

  server.listen(PORT, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${config.PORT}`)
  })
}).catch((e) => {
  console.error(e.stack);
  process.exit(1);
});

process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
  throw err;
});