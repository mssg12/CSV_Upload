// importing required packages
const path = require('path');
const csvParser = require('csv-parser');
const CSV = require('../models/csv')
const fs = require('fs');

// Exporting module To upload a file
module.exports.upload = async function(req,res){
    try{
        if(!req.file){
            return res.status(400).send("No Files were Uploaded.");
        }
        if(req.file.mimetype != "text/csv"){
            return res.status(400).send("Select CSVfiles Only.");
        }
        let file = await CSV.create({
            fileName : req.file.originalname,
            filePath: req.file.path,
            file: req.file.filename
        });
        return res.redirect('/');
    }
    catch (error){
        console.log('Error in fileCooontroller/upload',error);
        res.status(500).send('Internal server Error');    
    }
}

// Exporting module To show a file in tabular form
module.exports.view = async function(req,res){
    try{
        let csvFile = await CSV.findOne({file: req.params.id});
        const results = [];
        const header = [];
        fs.createReadStream(csvFile.filePath)
        .pipe(csvParser())
        .on('headers',(headers) => {
            headers.map((head) => {
                header.push(head);
            });
        })
        .on('data', (data) =>
        results.push(data))
        .on('end', () => {
            res.render("file_viewer",{
                title: "File-Viewer",
                fileName: csvFile.fileName,
                head: header,
                data : results,
                length: results.length
            });
        });
    }
    catch(error){
        console.log('Error in fileCooontroller/view',error);
        res.status(500).send('Internal server Error');    
    }
}

// Exporting module To delete a file
module.exports.delete = async function(req,res){
    try{
        let isFile = await CSV.findOne({file: req.params.id});

        if(isFile){
            await CSV.deleteOne({file: req.params.id});
            fs.unlink(isFile.filePath, (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
                console.log('File deleted successfully');
              });
            return res.redirect('/');
        }
        else{
            console.log("File not Found");
            return res.redirect("back");
        }
    } catch(error){
        console.log('Error in fileCooontroller/delete',error);
        return;  
    }
}
