// Для работы с garbage collector запустите проект с параметрами:
// node --nouse-idle-notification --expose-gc app.js
let gcInterval;

function init() {
  gcInterval = setInterval(function () {
    gcDo();
  }, 60000);
};

function gcDo() {
  global.gc();
  clearInterval(gcInterval);
  init();
};


module.exports = init;