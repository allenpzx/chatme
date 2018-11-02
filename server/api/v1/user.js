const express = require('express');
const Router = express.Router();
const models = require('../../model.js');
const User = models.getModel('user');
const crypto = require('crypto');
const _filter = {"password": 0, "__v": 0};

const md5 = (str) => {
    str += '*=abc123';
    let hash = crypto.createHash('md5');
    hash.update(str);
    str = hash.digest('hex');
    return str;
}

Router.get('/user-list', function (req, res){
    User.find({}, function (err, docs){
        if(err)return console.log(err)
        return res.json(docs);
    });
});

Router.get('/user', function (req, res){
    const {userid} = req.cookies;
    if(!userid){
        return res.json({code: 0});
    }else{
        User.findOne({_id: userid}, _filter, function(err, doc){
            if(err){
                return res.json({code: 0, message: '服务端正忙, 请稍后再试'});
            }
            if(doc){
                return res.json({code: 1, data: doc, message: '获取用户模型成功'});
            }
        });
    }
});

Router.post('/user/update', function (req, res){
    const userid = req.cookies.userid;
    if(!userid){
        return res.json({code: 0, message: '未找到该用户请重新登录'});
    }
    const body = req.body;
    User.findByIdAndUpdate(userid, body, function (err, doc){
        if(err){
            return res.json({code: 0, message: '更新失败, 请稍后重试'})
        }
        const data = Object.assign({}, body);
        return res.json({code: 1, data: data, message: '更新用户资料成功'})
    })
});

Router.post('/login', function (req, res){
    const {account, password} = req.body.data;
    User.findOne({account, password: md5(password)}, _filter, function (err, doc){
        if(!doc){
            return res.json({code: 0, message: '用户名或密码错误'});
        }else{
            res.cookie('userid', doc._id);
            return res.json({code: 1, data: doc, message: '登录成功'});
        }
    });
});

Router.post('/register', function (req, res){
    const {account, password, gender} = req.body.data;
    User.findOne({account}, function (err, doc){
        if(doc){
            return res.json({code: 0, message: '该用户已注册'});
        }
        const userModel = new User({account, gender, password: md5(password)});
        userModel.save(function (e, d){
            if (e) {
                return res.json({code: 0, message: '服务端正忙, 请稍后重试'});
            } else {
                const {account, gender, _id} = d;
                res.cookie('userid', _id);
                return res.json({code: 1, data: {account, gender, _id}, message: '服务端正忙, 请稍后重试'});
            }
        })
    });
});

Router.post('/logout', function (req, res){
    const {account, password} = req.body.data;
    User.findOne({account, password: md5(password)}, function (err, doc){
        if(!doc){
            return res.json({code: 0, message: '用户名或密码错误'});
        }else{
            return res.json({code: 1, data: doc, message: '登录成功'});
        }
    });
});

module.exports = Router;