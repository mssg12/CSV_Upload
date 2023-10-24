const mongoose = require('mongoose');

const CsvShcema = new mongoose.Schema({
    fileName : {
        type:String,
        required:true
    },
    filePath: {
        type:String,
        required:true
    },
    file: {
        type:[Object],
        required:true
    }
});

const csv = mongoose.model('CSV_Files',CsvShcema);

module.exports = csv;
