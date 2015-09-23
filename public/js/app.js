var parse = require('../node_modules/csv-parse'),
    fileReaderStream = require('../node_modules/filereader-stream'),
    LinvoDB = require("linvodb3"),
    modelName = "transactions",
    schema = {transactionDate: Date, description: String, amount: Number},
    options = {},
    Transactions = new LinvoDB(modelName, schema, options);

LinvoDB.dbPath = process.cwd();
Transactions.findOne({"amount": {$gt: 2} }).exec(function(err, doc) {
    console.log(doc);
});

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
            var transactionsArray = Object.keys(data).map(function(k) { return data[k]; });
            var filteredArray = [];
            console.log("data length: " + transactionsArray.length);
            console.log(transactionsArray);
            for (var i = 0; i < transactionsArray.length; i++) {
                var transactionObj = {};
                transactionObj.transactionDate = transactionsArray[i]["Trans. Date"];
                transactionObj.description = transactionsArray[i].Description;
                transactionObj.amount = transactionsArray[i].Amount;
                filteredArray.push(transactionObj);
            }
            Transactions.insert(filteredArray, function(err, newDocs) {
            });
            // Transactions.insert([{"Description":"AIRBNB INC 415-800-5959 CAHGNYK7W"},{"Amount":"22.00"},{"Category":"Travel / Entertainment"}], function(err, newDocs) {
            // });
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
