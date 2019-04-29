'use strict';
const config = require('../config');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token_header = req.headers.auth;

    if(!token_header) return res.status(401).send({error: 'Autenticação recusada'});

    jwt.verify(token_header, global.SALT_KEY, (err, decoded) => {
        if (err) return res.status(401).send({error: 'Token inválido'});
        res.locals.auth_data = decoded;
        return next();
    });
}

module.exports = auth;