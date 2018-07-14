require('dotenv').config();
var getPDFS = require('./get-pdfs/get-pdfs.js');

getPDFS.getInfoFile(function(out) {
	getPDFS.parseInfoFile(out);
	console.log(getPDFS.el.fileText);
});