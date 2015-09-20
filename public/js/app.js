document.write('The current version of io.js is ' + process.version +
        'and Electron is ' + process.versions['electron']);

var fs = require('fs'),
    contents = fs.readFileSync('./package.json', 'utf8');

alert(contents);
