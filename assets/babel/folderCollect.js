const path = require('path');
const config = require('../../server/common/config');
const fs = require('fs-extra');

function destination(fileFolderName) {
  return path.join(process.cwd(), 'public', fileFolderName);
};

const front = {
  source: path.join(process.cwd(), '.next'),
  destination: destination('/client/.next'),
};
const nextConfig = {
  source: path.join(process.cwd(), 'next.config.js'),
  destination: destination('/next.config.js'),
};
const packageJSON = {
  source: path.join(process.cwd(), 'package.json'),
  destination: destination('/package.json'),
};
const babelRC = {
  source: path.join(process.cwd(), '.babelrc'),
  destination: destination('/.babelrc'),
};
const staticFiles = {
  source: path.join(process.cwd(), 'static'),
  destination: destination('/client/static'),
};

const saveArr = [front, nextConfig, packageJSON, babelRC, staticFiles];

function save(source, destination) {
  fs.copy(source, destination)
    .then(function() { console.log('[X] ' + source + ' copied!'); })
    .catch(function(e) { console.error(e); })
};

function collectToFolder() {
  return Promise.all(saveArr.map(function(item) {
    save(item.source, item.destination);
  }));
};

module.exports = collectToFolder;