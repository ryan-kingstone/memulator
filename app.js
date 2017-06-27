"use strict";

const path = require('path');
const fs = require('fs');

const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const exec = require('child_process').exec;

const Utility = require('./app/Utility.js');

var swig = require('swig');

// serve static files from the public directory
app.use('/public', express.static(path.join(__dirname + '/public')));
app.use('/tmp', express.static(path.join(__dirname + '/tmp')));
app.use(fileUpload({
  limits: { fileSize: 40 * 1024 * 1024 }, safeFileNames: true
}));

var swig = new swig.Swig();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');

app.get('/', function(req, res) {
    res.render('index', { title: 'Memulator 9000' });
});

app.post('/', function(req, res) {
    console.log('Received post for upload routine');

    console.log(req.files);

    if (!req.files)
        return res.render('upload', { status: 'No files uploaded?', message: 'You know, the internet is a scary place. Files get lost in transmission quite often. Can you upload the file again?'});

    // The name of the input field (i.e. "file") is used to retrieve the uploaded file
    let file = req.files.uploaded;

<<<<<<< HEAD
    var newFileName = Utility.getRandomString(13);

    file.mv('uploads/' + newFileName + '.mp4', function(err) {
        if (err) {
            console.log(err.toString());
=======
    var newFileName = Utility.getRandomString(13) + '.mp4';

    file.mv('uploads/' + newFileName, function(err) {
        if (err)
>>>>>>> 6e798f96c374089eeb54b49d92be8df2bff0b218
            return res.status(500).send(err);
        }

        var cmd = 'ffmpeg -i uploads/' + newFileName + '.mp4 -r 10 "tmp/' + newFileName + '.gif" -hide_banner';
        exec(cmd, function(error, stdout, stderr) {

            res.render('upload', { status: 'File uploaded!', message: 'Attached is your converted image. Please keep in mind that this file will be removed from our server in 30 seconds.', image: 'tmp/' + newFileName + '.gif'});
            
            setTimeout(function timeout () {
                console.log('Removing old files');

                removeFiles('/tmp');
                removeFiles('/uploads');
            }, 30 * 1000);
        });
    });
});

app.get('/privacy', function(req, res) {
    res.render('privacy');
});

const server = app.listen(process.env.PORT || 80, function () {
	const port = server.address().port;
	
	console.log('Memulator running at port %s', port);

    if(!fs.existsSync('uploads')) {
        fs.mkdirSync('uploads');
    }

    if(!fs.existsSync('tmp')) {
        fs.mkdirSync('tmp');
    }

    removeFiles('/tmp');
    removeFiles('/uploads');
});

// helper function
var removeFiles = function(dir) {
	var list = fs.readdirSync(path.join(__dirname + dir));
	for(var i = 0; i < list.length; i++) {
		var filename = path.join(path.join(__dirname + dir), list[i]);
		var stat = fs.statSync(filename);
		
		if(filename == "." || filename == "..") {
			// pass these files
		} else if(stat.isDirectory()) {
			// rmdir recursively
			rmdir(filename);
		} else {
			// rm filename
			fs.unlinkSync(filename);
		}
	}
};