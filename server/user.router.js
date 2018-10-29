const express = require('express');
const Router = express.Router();

Router.get('/api/v1/user', function (req, res){
    return res.json({code: 1});
});

module.exports = Router;