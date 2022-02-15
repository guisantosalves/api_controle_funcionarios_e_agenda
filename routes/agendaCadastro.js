var express = require('express');
var router = express.Router();
var mongo = require('../connection/schemaAgenda.js');
var bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');

var urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/', function(req, res, next){
    try{
        res.render('agendaCadastro');
    }catch(err){
        res.status(400).json({error: err.array()});
    }
});

router.post('/add', body('nome').not().isEmpty().withMessage('O nome não pode ser vazio'),
body('primeiroTelefone').isNumeric().isLength({min: 8, max: 20}).not().isEmpty().withMessage('O número deverá ter no mínimo 9 e no máximo 20 caracteres'),
body('segundoTelefone').isNumeric().isLength({min: 8, max: 20}).not().isEmpty().withMessage('O número deverá ter no mínimo 9 e no máximo 20 caracteres'),
body('terceiroTelefone').isNumeric().isLength({min: 8, max: 20}).not().isEmpty().withMessage('O número deverá ter no mínimo 9 e no máximo 20 caracteres'),
function(req, res, next){
    try{
        var nomeFuncionario = req.body.nome;
        var primeiroTel = req.body.primeiroTelefone;
        var segundoTel = req.body.segundoTelefone;
        var terceiroTel = req.body.terceiroTelefone;
        
        var errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({erros: errors.array()})
        }else{
            var agenda = new mongo({
                nome: nomeFuncionario,
                primeiroTelefone: primeiroTel,
                segundoTelefone: segundoTel,
                terceiroTelefone: terceiroTel
            });
        
            agenda.save(function(err, row){
                if(err){
                    return console.error(err);
                }else{
                    console.log("A empresa "+row.nome+" foi cadastrada na agenda");
                    res.send('A empresa '+row.nome+' foi cadastrada com sucesso')
                    res.status(200);
                }
            })
        }
    }catch(err){
        res.status(400).json({error: err.array()});
    }
});

router.put('/update/:id', body('nome').not().isEmpty().withMessage('O nome não pode ser vazio'),
body('primeiroTelefone').isNumeric().not().isEmpty().withMessage('O número Não pode ser vazio'),
body('segundoTelefone').isNumeric().not().isEmpty().withMessage('O número Não pode ser vazio'),
body('terceiroTelefone').isNumeric().not().isEmpty().withMessage('O número Não pode ser vazio'),
function(req, res, next){

    try{
        var errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({erros: errors.array()});
        }else{
            var idURL = req.params['id'];
            var filter = {_id: idURL};
            var update = {nome: req.body.nome, primeiroTelefone: req.body.primeiroTelefone, segundoTelefone: req.body.segundoTelefone, terceiroTelefone: req.body.terceiroTelefone};
            mongo.findOneAndUpdate(filter, update).exec();
            res.send("O cadastro "+update.nome+" foi alterado com sucesso")
            res.status(200);
        }
    }catch(err){
        res.status(400).json({error: err.array()});
    }
});

router.delete('/delete/:id', urlencodedParser, function(req, res, next){
    try{
        var idURL = req.params.id;
        mongo.find({_id: idURL}).remove().exec();
        res.send('deletado com sucesso');
    }catch(err){
        res.status(400).json({error: err.array()});
    }
});

module.exports = router;