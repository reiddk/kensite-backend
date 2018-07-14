require('dotenv').config();
  
var parseOut = {

  parsePdfLine: function(pdfText) {
    var tmpArr = pdfText.split('--');
    var output = {};
    if (tmpArr.length > 1) {
      for (var i = 0; i < tmpArr.length; i++) {
        if (i === 0) {
          output['name'] = tmpArr[0].trim();
        } else if (i === 1) {
          output['pdf_link'] = tmpArr[1].trim().replace(/https:\/\/www.dropbox.com/g, process.env.HOST);
        } else if (i === 2) {
          output['pdf_image'] = tmpArr[2].trim().replace(/https:\/\/www.dropbox.com/g, process.env.HOST);
        } else if (i === 3) {
          output['pdf_description_link'] = tmpArr[3].trim();
        } else {
          break;
        }
      }
      return output;
    } else {
      return null;
    }
  },
  stripTags: function (input) {
    return input.replace(/\|(\<|\>)\|/g, "");
  },
  parseLine: function (input) {
    var splitInput = input.match(/\|\<\|[^\|]*\|\>\|/g);
    if (splitInput && splitInput.constructor === Array && splitInput.length > 1) {
        var tempTitle = this.stripTags(splitInput[0]);
        if (tempTitle === 'image') {
          return {'type': tempTitle, 'link': this.stripTags(splitInput[1]).replace(/https:\/\/www.dropbox.com/g, process.env.HOST)};
        } else if (tempTitle === 'html') {
          return {'type': tempTitle, 'link_output': this.stripTags(splitInput[1])};
        } else if (tempTitle === 'text') {
          return {'type': tempTitle, 'link_output': this.stripTags(splitInput[1]).split('\n')};
        } else if (tempTitle === 'pdfs') {
          var tempPdfOut = [];
          for (var i = 1; i < splitInput.length; i++) {
            var tempPdfLine = this.parsePdfLine(this.stripTags(splitInput[i]));
            if (tempPdfLine) {
              tempPdfOut.push(tempPdfLine);
            }
          }
          if (tempPdfOut.length > 0) {
            return {'type': tempTitle, 'link_output': tempPdfOut};
          } else {
            return null;
          }
        } else {
          return null
        }
      
    } else {
      return null;
    }
  },
  parseFile: function(input) {
    var out = [];
    var inputArray = input.split("-----");
    for (var i = 0; i < inputArray.length; i++) {
      var tempObj = this.parseLine(inputArray[i]);
      if (tempObj) {
        out.push(tempObj);
      }
    }
    return out;
  }

};

module.exports = parseOut;