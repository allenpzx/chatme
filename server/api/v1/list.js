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

Router.get('/list', function (req, res){
    const {gender} = req.query
    User.find({gender}, function (err, docs){
        if(err)return console.log(err);

        console.log(gender);
        return res.json(docs);
    });
});


module.exports = Router;