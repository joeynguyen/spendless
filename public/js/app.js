var parse = require('../node_modules/csv-parse'),
    fileReaderStream = require('../node_modules/filereader-stream');

var holder = document.getElementById('holder');
holder.ondragover = function () {
    return false;
};
holder.ondragleave = holder.ondragend = function () {
    return false;
};
holder.ondrop = function (e) {
    e.preventDefault();
    var file = e.dataTransfer.files[0],
        rs = fileReaderStream(file),
        parser = parse({columns: true, trim: true}, function(err, data){
            console.log(JSON.stringify(data));
        });
    rs.pipe(parser);
    return false;
};

function readFile() {
    var selectedFile = document.getElementById('fileUpload').files[0],
        rs = fileReaderStream(selectedFile),
        parser = parse({columns: true, trim: true}, function(err, data){
            console.log(JSON.stringify(data));
        });
    rs.pipe(parser);
}
