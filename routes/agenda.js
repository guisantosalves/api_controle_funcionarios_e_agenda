var express = require('express');
var router = express.Router();
var mongo = require('../connection/schemaAgenda.js');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});

//buscando a página agenda
router.get('/', urlencodedParser, function(req, res, next){
    try{
        mongo.find({}, function(err, data){
            res.render('agenda', {dados: data});
        });
    }catch(err){
        res.status(400).json({erros: err.array()})
    }
});

module.exports = router;