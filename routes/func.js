var express = require('express');
var router = express.Router();
var mongo = require('../connection/schema.js');
var bodyParser = require('body-parser');
const req = require('express/lib/request');
const {body, validationResult} = require('express-validator');

var urlencodedParser = bodyParser.urlencoded({extended: false});

/* GET func page. */
router.get('/', function(req, res, next) {
  try{
    res.render('func');
  }catch(err){
    res.status(400).json({error: err.array()})
  } 
});


//cadastro de funcionario
router.post('/', body('nome').not().isEmpty().withMessage('obrigatório colocar o nome'), 
body('email').isEmail().withMessage('email é obrigatório'), 
body('telefone').isLength({max: 11}).withMessage('telefone tem que ter no máximo 11 caracter'), 
body('salario').not().isEmpty().withMessage('o salario nao pode ser vazio'),
function(req, res, next){

  try{
    var nome = req.body.nome;
    var telefone =  req.body.telefone;
    var email = req.body.email;
    var estadoCivil = req.body.estadoCivil;
    var salario = req.body.salario;

    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    } else {
      var funcionario = new mongo({
        nome: nome,
        telefone: telefone,
        email: email,
        estadoCivil: estadoCivil,
        salario: salario
      });
      
      funcionario.save(function (err, func){
        if(err) return console.error(err);
        console.log(func.nome + " está cadastrado");
        res.send('Cadastro de '+func.nome+' efetuado com sucesso');
      });
      res.status(200);
    }
  }catch(err){
    res.status(400).json({errors: err.array()});
  }
  

});

//update do cadastro de funcionário
router.put('/:id', body('nome').not().isEmpty().withMessage('obrigatório colocar o nome'), 
body('email').isEmail().withMessage('email é obrigatório'), 
body('telefone').isLength({max: 11}).withMessage('telefone tem que ter no máximo 11 caracter'), 
body('salario').not().isEmpty().withMessage('o salario nao pode ser vazio'), 
function(req, res, next){

  try{
    var a = req.params['id'];
    var filter = {_id: a};
    var update = {nome: req.body.nome, email: req.body.email, telefone: req.body.telefone, salario: req.body.salario}

    var errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()})
    }else{
      mongo.findOneAndUpdate(filter, update).exec();
      res.send('você alterou o cadastro do '+update.nome);
      res.status(200);
    }
  }catch(err){
    res.status(400).json({error: err.array()});
  }
  
});

//delete de funcionário
router.delete('/:id', urlencodedParser, function(req, res, next){
  try{
    mongo.find({ _id: req.params.id}).remove().exec();
    res.send('exclusão feita com sucesso');
  }catch(err){
    res.status(400).json({error: err.array()});
  }
});

module.exports = router;