"use strict";

const path = require('path');
const fs = require('fs');

const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const Utility = require('./app/Utility.js');

var swig = require('swig');

// serve static files from the public directory
app.use('/public', express.static(path.join(__dirname + '/public')));
app.use(fileUpload({
  limits: { fileSize: 1 * 1024 * 1024 }, safeFileNames: true
}));

var swig = new swig.Swig();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');

app.get('/', function(req, res) {
    res.render('index', { title: 'Memulator 9000' });
});

app.post('/', function(req, res) {
    if(!fs.existsSync('uploads')) {
        fs.mkdirSync('uploads');
    }

    console.log(req.files);

    if (!req.files)
        return res.render('upload', { status: 'No files uploaded?', message: 'You know, the internet is a scary place. Files get lost in transmission quite often. Can you upload the file again?'});

    // The name of the input field (i.e. "file") is used to retrieve the uploaded file
    let file = req.files.uploaded;

    var newFileName = Utility.getRandomString(13) + '.mp4';

    file.mv('uploads/' + newFileName, function(err) {
        if (err)
            return res.status(500).send(err);

        res.render('upload', { status: 'File uploaded!', message: 'We have employed an undetermined amount of gnomes to transcribe your file into a .gif.'});
    });
});

app.get('/privacy', function(req, res) {
    res.render('privacy');
});

const server = app.listen(process.env.PORT || 8082, function () {
	const port = server.address().port;
	
	console.log('Memulator running at port %s', port);
});