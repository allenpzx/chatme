const express = require('express');
const app = express();
const port = 9093;
const userRouter = require('./user.router.js');

app.use('/user', userRouter);

app.use('/static', express.static('static'));

// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const DB_Name = 'chatme';
const DB_URL = 'mongodb://localhost:27017';
mongoose.connect(`${DB_URL}${DB_Name}`, { useNewUrlParser: true });
const db = mongoose.connection;

const userScheme = new mongoose.Schema({
  name: {type: String, required: true},
  age: {type: Number, required: true},
  gender: {type: String, required: true},
  wanna: {type: String, required: true}
});
userScheme.methods.talkName = function (cb){
  console.log('this.name', this.name);
  cb && cb();
};
userScheme.virtual('allDetail').get(function (){
  return this.name + ' ' + this.age + ' ' + this.gender + ' ' + this.wanna
})
const User = mongoose.model('user', userScheme);

const addUser = user => {
  let someone = new User({
    name : "ceshi name",
    age : 18,
    gender : 'male',
    wanna : 'girl'
  });
  someone.save(function (err, arg){
    if(err) return console.error(err);
    console.log('save user successful', arg);
  })
  someone.talkName();
}

const updateUser = props => {
  User.find(props, function (err, docs){

  })
}

const removeUser = props => {
  User.deleteOne(props, function(err, doc){
    if(err){
      console.log('removeUser error', err);
      return 
    }else{
      console.log('removeUser success', doc);

    }
  })
}

const showUser = props => {
  User.find(props, function (err, users){
    if (err) return console.error(err);
    console.log('show users', users);
  })
}

// app.get('/api/v1/user', function (req, res){
//   User.find({}, function (err, doc){
//     res.json(doc);
//   });
// })

app.listen(port, function (){
  console.log(`express app is listented on port ${port}`); 
});

// function handleRender(req, res) {
//     const html = ReactDOMServer.renderToString(
//       <Provider store={store}>
//         <BrowserRouter>
//             <App />
//         </BrowserRouter>
//       </Provider>
//     )
//     const preloadedState = store.getState();
//     res.send(renderFullPage(html, preloadedState));
// }
// function renderFullPage(html, preloadedState) {
//     return `
//       <!doctype html>
//       <html>
//         <head>
//           <title>ChatMe</title>
//           <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />
//         </head>
//         <body>
//           <div id="root">${html}</div>
//           <script>
//             // 警告：关于在 HTML 中嵌入 JSON 的安全问题，请查看以下文档
//             // http://redux.js.org/recipes/ServerRendering.html#security-considerations
//             window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
//           </script>
//           <script src="/static/bundle.js"></script>
//         </body>
//       </html>
//       `
// }