//mongoose connect
const mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect('mongodb://localhost/loja', {useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
    if(!err){
        console.log("conectado");
    }else{
        console.log("nao esta conectado");
    }
    });
}