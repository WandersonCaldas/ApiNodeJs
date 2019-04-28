'use strict'

const express = require('express');
const app = express();

const indexRoute = require('./Routes/index');
const usersRoute = require('./Routes/users');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const url = 'mongodb+srv://admin:abcd1234@cluster0-ixxhf.mongodb.net/test?retryWrites=true';
const options = {    
    poolSize: 5,
    useNewUrlParser: true
};

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) =>{
    console.log('ERRO CONEXÃO BANCO: ' + err);
});
mongoose.connection.on('disconnected', () =>{
    console.log('BANCO DESCONECTADO');
});
mongoose.connection.on('connected', () =>{
    console.log('BANCO CONECTADO');
});

//BODY PARSER
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', indexRoute);
app.use('/users', usersRoute);


app.listen(3000);
module.exports = app;