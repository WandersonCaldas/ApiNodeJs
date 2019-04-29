'use strict'

const expres = require('express');
const router = expres.Router();
const auth = require('../Middlewares/auth');
const Users = require('../Model/user'); 

router.get('/', auth, async(req, res) => {
    try{
        //console.log(res.locals.auth_data);
        const users = await Users.find({});
        return res.send(users);
    } catch(err) {
        return res.status(500).send({ error: 'Routes users: ' + err });
    }    
});

router.post('/', async (req, res) =>{  
    const { email, password } = req.body;
    
    if (!email || !password) return res.status(401).send({ error: 'E-MAIL e PASSWORD inválidos' });    
     
    try {
        if (await Users.findOne({email})) return res.status(400).send({error: 'Usuário já registrado'});
        
        const user = await Users.create(req.body);
        console.log(user._id);
        user.password = undefined;

        return res.status(201).send(user);
    } catch(err) {
        return res.status(500).send({ error: 'Routes users create: ' + err });
    }     
});

module.exports = router;