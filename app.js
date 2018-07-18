require('dotenv').config();
var getPDFS = require('./get-pdfs/get-pdfs.js');
var pdfToHtml = require('./pdf-to-html/pdf-to-html.js');
var async = require('async');

getPDFS.getInfoFile(function(out) {
	getPDFS.parseInfoFile(out);
	async.waterfall([
	  /*function(callback){
		getPDFS.downloadAllPdfs(getPDFS.el.mainBooks.link_output, 'books', function () {
			callback(null);
		});
	  },
	  function(callback){
		getPDFS.downloadAllPdfs(getPDFS.el.papers.link_output, 'papers', function () {
			callback(null);
		});
	  },*/
	  function(callback) {
	  	pdfToHtml.setupDirectory('./pdf-to-html/html/books', function() {
	  		callback(null);
	  	});
	  },
	  function(callback) {
	  	pdfToHtml.setupDirectory('./pdf-to-html/html/papers', function() {
	  		callback(null);
	  	});
	  },
	  function(callback) {
	  	pdfToHtml.pdfToHtml(getPDFS.el.mainBooks, 'books', function() {
	  		callback(null);
	  	});
	  },
	  function(callback) {
	  	pdfToHtml.pdfToHtml(getPDFS.el.papers, 'papers', function() {
	  		callback(null);
	  	});
	  },
	], function (err, result) {
		if (err) console.log(err);
	  	console.log('done');
	});
});