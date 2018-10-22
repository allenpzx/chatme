const express = require('express');
const app = express();

app.get('/', (req, res)=>{
    res.send('<h1>Hello World !!!!!</h1>');
    res.sendFile()
});

app.listen(9093, ()=>{
    console.log('Node app start at port 9093');
});