'use strict'

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const indexRoute = require('./Routes/index');
const usersRoute = require('./Routes/users');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');

const url = config.bd_string;
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
