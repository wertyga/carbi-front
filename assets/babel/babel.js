const path = require('path');

const server = require('./babelableServer');
const serverPath = path.join(__dirname, '../../server');

const collectToFolder = require('./folderCollect');

function letsCompile() {
  console.log('[X] Building assets...');
  server.checkRootPath()
    .then(function() {
      server.babeable(serverPath);
      collectToFolder()
    });
};

letsCompile();


