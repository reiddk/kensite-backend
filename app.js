require('dotenv').config();
var getPDFS = require('./get-pdfs/get-pdfs.js');

getPDFS.getInfoFile(function(out) {
	getPDFS.parseInfoFile(out);
	console.log(getPDFS.el.mainBooks.link_output);
	getPDFS.emptyDirectory('./');
	getPDFS.downloadAllPdfs(getPDFS.el.mainBooks.link_output, 'books', function () {});
	getPDFS.downloadAllPdfs(getPDFS.el.papers.link_output, 'papers', function () {});
});