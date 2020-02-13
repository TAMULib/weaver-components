const fs = require('fs-extra');
var compoLocation = 'node_modules/@compodoc/compodoc/dist/application-54cd2170.js';

fs.readFile(compoLocation, 'utf8', function (err, data) {

  const correctLine = 'obj.set(prop.name?prop.name.text:"", prop.initializer?prop.initializer.text:"");';
  const formatted = data.replace(/obj.set\(prop.name.text, prop.initializer.text\)/g, correctLine);

  fs.writeFile(compoLocation, formatted, 'utf8', function (err) {
    if (err) return console.log(err);
  });

});