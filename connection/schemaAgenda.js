var mongoose = require('mongoose');
var connection = require('./connection.js');

//abrindo conexao
connection();

//schema agenda
var agendaSchema = mongoose.Schema({
    nome: String,
    primeiroTelefone: Number,
    segundoTelefone: Number,
    terceiroTelefone: Number
});

var Agenda = mongoose.model('Agenda', agendaSchema, 'agenda_funcionario');

module.exports = Agenda;