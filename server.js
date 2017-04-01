var express = require('express');
var multer = require('multer');
var path = require('path');
var crypto = require('crypto');

var storage = multer.diskStorage({
  destination: './uploads',
  filename: function(req, file, cb) {
    return crypto.pseudoRandomBytes(16, function(err, raw) {
      if (err) {
        return cb(err);
      }
      return cb(null, '' + (raw.toString('hex')) + (path.extname(file.originalname)));
    });
  }
});

var app = new express();

app.post('/', multer({
  storage: storage
}).array('file', 10), function(req, res) {
  console.log(req.files);
  console.log(req.body);
  return res.status(204).end();
});

app.listen(5000, console.log('Listening on port 5000'));
