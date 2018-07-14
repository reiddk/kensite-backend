require('dotenv').config();
var request = require('request');
var parseOut = require('../services/parse-files');
var async = require('async');

var options = {
  host: process.env.HOST,
  path: process.env.INFOPATH,
  port: 80,
  method: 'GET',
  headers: {
     'Content-Type': 'text/plain',
  }
};


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
  }

};


module.exports = getPDFS;