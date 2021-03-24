const express = require('express');
const User = require('../models/user');

const router = express.Router(); 

router.get('/', async (req, res, next) => {
    try{
        const users = await User.findAll();
        console.log('index.js(routes)실행');
        res.render('nametext', { users });
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;