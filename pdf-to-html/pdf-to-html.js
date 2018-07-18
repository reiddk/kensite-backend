require('dotenv').config();
var async = require('async');
var fs = require('fs');
var utilities = require('../services/utility');
const execSync = require('child_process').execSync;

var pdfToHtml = {
  el: {},
  setCache: function() {},
  init: function () {},
  setupDirectory: function (directory, callback) {
    utilities.resetDirectory(directory, function () {
      callback();
    });
  },
  pdfToHtml: function (pdfInfo, directory, callback) {
    async.forEachOf(pdfInfo.link_output, (value, key, innerCallback) => {
      execSync('mkdir ./pdf-to-html/html/' + directory + '/\"' + value.name + '\"');
      try {
        execSync('pdftohtml -c -i -nomerge ./get-pdfs/pdfs/' + directory +'/\"' + value.name + '.pdf\" ./pdf-to-html/html/' + directory +'/' + '\"' + value.name + '\"/' + '\"' + value.name + '.html\"');
      } catch (e) {
        console.log(e);
      }

      innerCallback();
    }, err => {
        if (err) console.error(err.message);
        callback();
    });
  }

};


module.exports = pdfToHtml;
