const { text } = require('express');
const express = require('express');
const User = require('../models/user');

const router = express.Router();
console.log('routes 들어옴');
router.route('/')
    .get(async (req, res, next) => {
        try{
            console.log('routes-get');
            const users = await User.findAll();
            res.json(users);
        }catch(err){
            console.error(err);
            next(err);
        }
    })
    .post(async (req,res,next) => {  // 추가route
        try{
            const user = await User.create({
                name: req.body.name,
                text: req.body.text,
            });
            console.log(user);
            console.log('routes-post');
            res.status(201).json(user); //서버는 요청한 클라이언트에게 새로만든 유저데이터로 응답을 보냄(REST API방식)
        }catch(err){
            console.error(err);
            next(err);
        }
    });

router.get('/:id', async (req, res, next) => {
    try{
        const users = await User.findAll();
        console.log('routes-find');
        console.log(users);
        res.json(users);
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.delete('/:id', function(req, res, next){
    let ID = req.params.id;
    User.destroy({ where: { id: ID } });
});

router.patch('/:id', function(req, res, next){
    let ID = req.params.id;
    console.log("patched");
    User.update({text : req.body.text},{where : {id:ID}});
});
// router.route('/:id')
//     .patch(async (req, res, next) => {  // 수정route
//         console.log('patch 실행');
//         try{
//             const result = await User.update({
//                 text: req.body.text,
//             },{
//                 where: { id: req.params.id }
//             });
//             console.log(User.text);
//             res.json(result);
//             console.log('routes-update');
//         }catch(err){
//             console.error(err);
//             next(err);
//         }
//     })
    // .delete(async (req,res,next) => {  //  삭제route
    //     try{
    //         console.log('routes-delete');
    //         const result = await User.destroy({ where: { id: req.params.id } });
    //         res.json(result);
    //     }catch(err){
    //     console.error(err);
    //     next(err);
    // }
    // })

module.exports = router;