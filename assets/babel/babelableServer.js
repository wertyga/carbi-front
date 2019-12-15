const fs = require('fs-extra');
const path = require('path');
const babel = require('@babel/core');

const babelOptions = {
  presets: ['@babel/env']
};

const productPath = 'public/server';
const rootPath = path.join(process.cwd(), 'public');

function checkRootPath() {
  return fs.emptyDir(rootPath);
}

function babeable(serverPath) { // Babel the server folder and copy it to public
  if (!productPath) {
    console.error('Need to provide public path!');
    return;
  }

  const server = path.join(process.cwd(), productPath);
  if (!server) fs.mkdirSync(server);

  if(fs.statSync(serverPath).isDirectory()) {
    try {
      fs.statSync(serverPath.replace('server', productPath));
    } catch(e) {
      if(e.code === 'ENOENT') {
        fs.mkdirSync(serverPath.replace('server', productPath));
      } else {
        console.error(e);
        return;
      }
    };

    fs.readdirSync(serverPath)
      .map(item => path.join(serverPath, item))
      .forEach(async item => babeable(item));
  } else if(serverPath.match(/\.js/)){
    babel.transformFile(serverPath, babelOptions, (err, result) => {
      if(err) {
        console.error(err);
        return;
      } else {
        fs.writeFile(serverPath.replace('server', productPath), result.code, err => { if(err) { console.error(err) }})
      };
    });
  };
};

module.exports = {
  babeable: babeable,
  checkRootPath: checkRootPath,
};