const express = require('express');
const Router = express.Router();
const models = require('../../model.js');
const User = models.getModel('user');
const Chat  = models.getModel('chat');
const crypto = require('crypto');
const _filter = {"password": 0, "__v": 0};

const md5 = (str) => {
    str += '*=abc123';
    let hash = crypto.createHash('md5');
    hash.update(str);
    str = hash.digest('hex');
    return str;
}

Router.get('/user/match-list', function (req, res){
    const {userid} = req.cookies;
    User.findById(userid, _filter, function (err, doc){
        if(err) return console.log(err)
        console.log(doc)
        const target = doc.gender === 'male' ? 'female' : 'male';
        User.find({gender: target}, _filter, function (e, d){
            if(e) return console.log(e)
            return res.json({code: 1, data: d, message: `获取匹配${target}列表成功`})
        })
    });
});

Router.get('/user/message-list', function (req, res){
    const {userid} = req.cookies;
    if(!userid){
        res.json({code: 0, message: '暂无用户信息，请先登录'})
    }
    const condition = {'$or': [{from: userid, to: userid}]};
    Chat.find({}, function(err, docs){
        if(err) console.log('/user/message-list api error: ', err);
        return res.json({code: 1, data: docs, message: '查询成功'});
    });
});


Router.get('/user/list', function (req, res){
    const {gender} = req.query;
    User.find({gender}, _filter, function (err, docs){
        if(err)return console.log(err)
        return res.json({code: 1, data: docs, message: `获取${gender}成功`});
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
    const {userid} = req.cookies;
    User.findById(userid, function (err, doc){
        if(err){
            return res.json({code: 0, message: '退出失败, 请重试'});
        }else{
            return res.json({code: 1, data: doc, message: '登录成功'});
        }
    });
});

module.exports = Router;