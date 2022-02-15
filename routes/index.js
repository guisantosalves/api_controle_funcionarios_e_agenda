var express = require('express');
const { db } = require('../connection/schema.js');
var router = express.Router();
var mongo = require('../connection/schema.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  try{
    mongo.find({}, function (err, docs) {

      res.render('index', {documentos: docs});

    });
  }catch(err){
    res.status(400).json({erros: err.array()});
  }
});


module.exports = router;
