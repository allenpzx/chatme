const express = require('express');
const app = express();
const port = 9093;
app.use('/static', express.static('static'));

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'chatme';
const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017';
mongoose.connect(`${DB_URL}${dbName}`, { useNewUrlParser: true });
var db = mongoose.connection;
// db.on('connected', ()=>{
//   console.log(`db ${dbName} is connected`);
// })
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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

const showDB = () => {
  User.find({}, function (err, doc){
    console.log('users', doc)
  });
}
// showDB()

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

const removeUser = user => {
  User.deleteOne({gender: "male"}, function(err, doc){
    if(err){
      console.log(err);
    }else{
      console.log('deleted success', doc);
    }
  })
}

const showUser = () => {
  User.find(function (err, users){
    if (err) return console.error(err);
    console.log('show users', users);
  })
}

const test = () => {

  // User.findById('5bd15dc29386821ad6c53152', function (err, doc){
  //   doc.name = 'test for update name!!!';
  //   doc.save(function (err, updatedTank) {
  //     // if (err) return handleError(err);
  //     // res.send(updatedTank)
  //   })
  // })
  // User.update({_id: '5bd15df49386821ad6c53153'}, {$set: {name: 'test for update directly'}}, function (err, doc){
  //   console.log('test update callback', doc)
  // })
  User.find({_id: '5bd00dc9c666cb9c745ddd39'}).update({name: 'update name'}, function (err, result){
    console.log('deleted result', result)
  })
}
test();

app.get('/user', function (req, res){
  User.find({}, function (err, doc){
    console.log('users', doc)
    res.json(doc);
  });
})

app.get('/api/all-user', function (req, res){

  // let who = new User({
  //   name: 'whose',
  //   age: 18,
  //   gender: 'male',
  //   wanna: 'test'
  // })
  // who.save(function (err){
  //   if(err) console.log(err);
  //   console.log('save successed');
  // })

  User.find({}, function (err, doc){
    if(err) console.log(err);
    res.json(doc);
  })
})


const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection", result);
    callback(result);
  });
}

const findDocuments = function(db, callback) {
  const collection = db.collection('documents');
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}

const updateDocument = function(db, callback) {
  const collection = db.collection('documents');
  collection.updateOne({ a : 2 }
    , { $set: { b : 1 } }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated the document with the field a equal to 2");
    callback(result);
  });
}

const removeDocument = function(db, callback) {
  const collection = db.collection('documents');
  collection.deleteOne({ a : 2, b: 1 }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    callback(result);
  });
}

const indexCollection = function(db, callback) {
  db.collection('documents').createIndex(
    { "a": 1 },
      null,
      function(err, results) {
        console.log(results);
        callback();
    }
  );
};

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

app.listen(port);

// console.log(`express app is listen on port ${port}`); 