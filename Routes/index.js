'use strict'

const expres = require('express');
const router = expres.Router();
const Users = require('../Model/user'); 
const jwt = require('jsonwebtoken');
const config = require('../config');
const auth = require('../Middlewares/auth');

const createUserToken = (userId) => {    
    return jwt.sign({ id: userId }, global.SALT_KEY, {expiresIn: '1d'});
}

router.get('/', (req, res) => {
    return res.send({message: 'GET index'});
});

router.post('/auth', async (req, res) => {   
    try {        
        const user = await Users.findOne({ email: req.body.email, password: req.body.password });
        if (!user) {
            return res.status(401).send({ error: 'Autenticação inválida' });
        }                              

        return res.send({user, token: createUserToken(user._id) });
    } catch(err) {
        return res.status(500).send({ error: 'Routes users auth: ' + err });
    }
});

module.exports = router;