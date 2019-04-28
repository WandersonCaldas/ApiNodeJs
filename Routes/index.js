'use strict'

const expres = require('express');
const router = expres.Router();
const Users = require('../Model/user'); 
const jwt = require('jsonwebtoken');

const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, 'f5b99242-6504-4ca3-90f2-05e78e5761ef', {expiresIn: '1d'});
}

router.get('/', (req, res) =>{
    return res.send({message: 'GET index'});
});

router.post('/auth', async (req, res) => {   
    try {        
        const user = await Users.findOne({ email: req.body.email, password: req.body.password });
        if (!user) {
            return res.send({ error: 'Autenticação inválida' });
        }  
                
        return res.send({user, token: createUserToken(user._id) });
    } catch(err) {
        return res.send({ error: 'Routes users auth: ' + err });
    }
});

module.exports = router;