const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/csv_upload_db').then(() => {
    console.log('Connection Successfull');
}).catch((err) => console.log("No Connection :",err));

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to DB"));

db.once("open", function(){
    console.log("Successfully Connected to DB");
});

module.export = db;
