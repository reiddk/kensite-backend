require('dotenv').config();
var request = require('request');
var parseOut = require('../services/parse-files');
var async = require('async');
var rimraf = require('rimraf');
var fs = require('fs');


var getPDFS = {
  el: {},
  setCache: function() {},
  init: function () {},
  getInfoFile: function(callback) {
    request(process.env.HOST+process.env.INFOPATH, function (error, response, body) {
      if (response.statusCode < 400) {
        callback(body);
      } else {
        callback(null);
      }
    });
  },
  parseInfoFile: function(toParse) {
    getPDFS.el.fileText = parseOut.parseFile(toParse);
    var choose = true;
    for (var i = 0; i < getPDFS.el.fileText.length; i++) {
      if (getPDFS.el.fileText[i].type === 'pdfs' && choose) {
        getPDFS.el.mainBooks = getPDFS.el.fileText[i];
        choose = false;
      }
      if (getPDFS.el.fileText[i].type === 'pdfs' && !choose) {
        getPDFS.el.papers = getPDFS.el.fileText[i];
      }
    }
  },
  emptyDirectory: function (directory, callback) {
    rimraf(directory, function () { 
      callback();
    });
  },
  downloadAllPdfs: function (pdfObj, directory, callback) {
    async.forEachOf(pdfObj, (value, key, innerCallback) => {

    var r = request(value.pdf_link);
    r.on('response',  function (res) {
      res.pipe(fs.createWriteStream('./get-pdfs/pdfs/' + directory + '/' + value.name + '.' + res.headers['content-type'].split('/')[1]));
      innerCallback();
    });
    }, err => {
        if (err) console.error(err.message);
        callback();
    });

  }

};


module.exports = getPDFS;

/*
var r = request(url2);

r.on('response',  function (res) {
  res.pipe(fs.createWriteStream('./' + res.headers.date + '.' + res.headers['content-type'].split('/')[1]));

});
*/