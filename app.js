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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', indexRoute);
app.use('/users', usersRoute);

const port = normalizaPort(process.env.PORT || '3000');

function normalizaPort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}


app.listen(port, function () {
    console.log('PORTA: ' + port);
})
module.exports = app;
