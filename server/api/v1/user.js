const express = require('express');
const Router = express.Router();
const models = require('../../model.js');
const User = models.getModel('user');

Router.get('/user-list', function (req, res){
    User.find({}, function (err, docs){
        if(err)return console.log(err)
        return res.json(docs);
    });
});
Router.post('/register', function (req, res){
    console.log(req, req.body, req.body.data);

    const {account, password, gender} = req.body.data;
    User.findOne({user: user}, function (err, doc){
        if(doc){
            return res.json({code: 0, message: '该用户已注册'});
        }
        User.create({account, password, gender}, function (e, d){
            if(e){
                return res.json({code: 0, message: '注册用户后端出错, 请稍后再试'})
            }
            return res.json({code: 1, })
        })
    });
});
Router.get('/user', function (req, res){
    return res.json({code: 0});
});

module.exports = Router;