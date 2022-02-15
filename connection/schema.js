var mongoose = require('mongoose');
var connect = require('./connection.js');

//abrindo conexao
connect();

//schema
var funcionarioSchema = mongoose.Schema({
    nome: String,
    telefone: Number,
    email: String,
    estadoCivil: String,
    salario: Number
});

var funcionario = mongoose.model('funcionario', funcionarioSchema, 'mecanica');

module.exports = funcionario;