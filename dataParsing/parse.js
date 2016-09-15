
var fs = require('fs');

var fileContent;
var text = '';



fs.readFile('./godandata.csv','utf8', function read(err, data) {
    if (err) {
        throw err;
    }
    fileContent = data.trim();
    var arr = fileContent.split('\n');

    arr.forEach(function(element,idx){
      var line = element.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
      if (line !== null && line.length == 18){
        text += line[5]+','+line[7]+','+line[11]+','+line[15]+'\n';
      } else {
        console.log('!!');
      }

    });
    console.log(text);

    fs.writeFile('./output.txt',text , function(){

    });
});
