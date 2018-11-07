const express = require('express');
const app = express();
const port = 9093;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const userRouter = require('./api/v1/user.js');


const models = require('./model.js');
const Chat  = models.getModel('chat');
// work with express
const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', function(socket){
  socket.on('send-msg-client', function(data){
    const {from, to, message} = data;
    const chatid = [from, to].sort().join('_');
    console.log(data)
    Chat.create({chatid, from, to, content: message}, function(err, doc){
      if(err) return res.json({code: 0, data: err, message: '服务端创建会话失败，请稍后再试'});
      console.log('doc', doc);
      io.emit('send-msg-server', Object.assign({}, doc._doc));
    });
  })
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api/v1', userRouter);

server.listen(port, function (){
  console.log(`express app is listented on port ${port}`); 
});