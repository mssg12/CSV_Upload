// importing required packages
const express = require('express');
const port = process.env.port || 8000;
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const csv = require('csv-parser');
const db = require('./config/mongoose');
const bodyParser = require('body-parser');

// setting Layouts
app.use(expressLayouts);
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('./assets'));

//setting View engine 
app.set('view engine','ejs');
app.set('views','./views');

// setting routes
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log("Error!!");
        return;
    }
    console.log("Server is up and running on port :",port);
});