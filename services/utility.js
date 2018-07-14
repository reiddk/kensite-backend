var rimraf = require('rimraf');
var fs = require('fs');

var utilities = {
  el: {},
  setCache: function() {},
  resetPdfDirectory: function (directory, callback = function() {}) {
    rimraf(directory, function () { 
      fs.mkdirSync(directory);
      fs.mkdirSync(directory + '/books');
      fs.mkdirSync(directory + '/papers');
      callback();
    });
  }
};

module.exports = utilities;