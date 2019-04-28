'use strict'

const expres = require('express');
const router = expres.Router();
const Users = require('../Model/user'); 


router.get('/', async (req, res) => {
    try{
        const users = await Users.find({});
        return res.send(users);
    } catch(err) {
        return res.send({ error: 'Routes users: ' + err });
    }    
});

router.post('/', async (req, res) =>{  
    const { email, password } = req.body;
    
    if (!email || !password) return res.send({ error: 'E-MAIL e PASSWORD inválidos' });    
     
    try {
        if (await Users.findOne({email})) return res.send({error: 'Usuário já registrado'});
        
        const user = await Users.create(req.body);
        console.log(user._id);
        user.password = undefined;

        return res.send(user);
    } catch(err) {
        return res.send({ error: 'Routes users create: ' + err });
    }     
});

module.exports = router;