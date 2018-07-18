var rimraf = require('rimraf');
var fs = require('fs');

var utilities = {
  el: {},
  setCache: function() {},
  resetDirectory: function (directory, callback = function() {}) {
    rimraf(directory, function () { 
      fs.mkdirSync(directory);
      callback();
    });
  }
};

module.exports = utilities;