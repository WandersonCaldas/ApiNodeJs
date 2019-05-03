'use strict'

const expres = require('express');
const router = expres.Router();
const auth = require('../Middlewares/auth');
const Users = require('../Model/user'); 
const msg = require('../mensagem');

router.get('/', auth, async(req, res) => {
    try{
        //console.log(res.locals.auth_data);
        const users = await Users.find({});
        return res.send(users);
    } catch(err) {
        return res.status(500).send({ error: 'Routes users: ' + err });
    }    
});

router.post('/', auth, async (req, res) =>{  
    const { email, password } = req.body;
    
    if (!email || !password) return res.status(401).send({ error: msg.MN003});    
     
    try {
        if (await Users.findOne({email})) return res.status(400).send({error: msg.MN002});
        
        const user = await Users.create(req.body);
        console.log(user._id);
        user.password = undefined;

        return res.status(201).send(user);
    } catch(err) {
        return res.status(500).send({ error: 'Routes users create: ' + err });
    }     
});

router.put('/:id', auth, async (req, res) => {    
    const id = req.params.id;    

    var usuario = await Users.findOne({_id: id});    
    if (!usuario) return res.status(400).send({error: msg.MN001});
    
    try {
        const user = await Users.findByIdAndUpdate(id, { $set: req.body});

        return res.status(201).send(await Users.findOne({_id: id}));
    } catch(err) {
        return res.status(500).send({ error: 'Routes users put: ' + err });
    }     
});

router.delete('/:id', auth, async (req, res) =>{
    const id = req.params.id;    

    var usuario = await Users.findOne({_id: id});   
    if (!usuario) return res.status(400).send({error: msg.MN001});
    
    try {
        await Users.findByIdAndRemove({_id: id});

        return res.status(201).send({ mensagem: msg.MN004});
    } catch(err) {
        return res.status(500).send({ error: 'Routes users delete: ' + err });
    } 
});

module.exports = router;