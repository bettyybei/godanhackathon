var db = require('./server/db/_db.js');
var Product = require('./server/db/product.js');
var Promise = require('sequelize').Promise;
var fs = require('fs');

var text = '';
var finalArr = [];
var setOfItems = new Set();

/*[{src: "USA", dst:"Argentina", item: "beans", value: "1000"},{src: "USA", dst:"Brazil", item: "beans", value: "10000"}];*/

var obj = {};

fs.readFile('../countryCodes.txt','utf8', function read(err, data) {
    if (err) {
        throw err;
    }
    fileContent = data.trim();
    var arr = fileContent.split('\n');
    var countryFullName = '';
    for (var i=0;i<arr.length;i++){
      switch (i%3){
        case 0:
          countryFullName = arr[i].replace(/['"]+/g, '');
          break;
        case 1:
          break;
        case 2:
          obj[countryFullName] = arr[i].replace(/['"]+/g, '');
          countryFullName = '';
          break;
      }
    }
    readFile();
});



function readFile(){
  var fileContent2;
  // var text2 = '';
  fs.readFile('../output.txt','utf8', function read(err, data) {
      if (err) {
          throw err;
      }
      fileContent2 = data.trim();
      var arr = fileContent2.split('\n');
      finalArr = [];
      arr.forEach(function(element,idx){
          var line = element.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
          var tempObj = {};
          if (line.length === 4) {
            var source = line[0].replace(/['"]+/g, '');
            var dest = line[1].replace(/['"]+/g, '');
            if (obj[source] === undefined || obj[dest] === undefined){
              return;
            } else {
              source = obj[source];
              dest = obj[dest];
            }
            tempObj.src = source;
            tempObj.dst = dest;
            tempObj.item = line[2].replace(/['"]+/g, '');
            tempObj.value = parseInt(line[3].replace(/['"]+/g, ''));

            setOfItems.add(tempObj.item);
            if (tempObj.value !== 0) finalArr.push(tempObj);
          }
          tempObj = {};
      });
      console.log("set of items", setOfItems);
      console.log("final array length", finalArr.length);

  });
}

function seedProducts(beg, end) {
  console.log("seeding...");
  finalArr = finalArr.slice(beg,end)
/*  finalArr.forEach(function (obj) {
    Product.create(obj);
  })
*/
  var creatingProducts = finalArr.map(function (productObj) {
        return Product.create(productObj);
    });

  return Promise.all(creatingProducts);
}

db.sync({force: true})
.then(function () {
  return seedProducts(0,100000);
})
.then(function () {
  console.log('three...');
  return seedProducts(100000, 200000);
})
/*.then(function () {
  console.log('two...');
  return seedProducts(200000, 300000);
})*/
/*.then(function () {
  console.log('one...');
  return seedProducts(300000, finalArr.length)
})*/
.then(function () {
  console.log("Success!")
  process.exit(0);
})
.catch(function () {
  console.log("Seed didn't work");
  process.exit(1);
})