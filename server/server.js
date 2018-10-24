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
db.on('connected', ()=>{
  console.log(`db ${dbName} is connected`);
})
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const User = mongoose.model('user', new mongoose.Schema({
  name: {type: String, required: true},
  age: {type: Number, required: true},
  gender: {type: String, required: true},
  wanna: {type: String, required: true}
}));

const addUser = user => {
  // User.create({
  //   name: "allen",
  //   age: 24,
  //   gender: 'male',
  //   wanna: "tender"
  // }, function(err, doc){
  //   if(err){
  //     console.log(err)
  //     return 
  //   }else{
  //     console.log('insert success', doc);
  //   }
  // }) 

  let someone = new User();
  someone.name = "ceshi name";
  someone.age = 18;
  someone.gender = 'male';
  someone.wanna = 'girl';

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

removeUser()

app.get('/user', function (req, res){
  User.find({}, function (err, doc){
    res.json(doc);
  });
})


// mongoose.connect('mongodb://localhost/my_database');

// MongoClient.connect(url, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

//   const db = client.db(dbName);

//   // insertDocuments(db, function() {
//   //   findDocuments(db, function() {
//   //     client.close();
//   //   });
//   // });
//   // removeDocument(db, function (){
//   //   findDocuments(db, function (){
//   //     client.close();
//   //   })
//   // })

//   insertDocuments(db, function() {
//     indexCollection(db, function() {
//       client.close();
//     });
//   });
// });

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
  // Get the documents collection
  const collection = db.collection('documents');
  // Update document where a is 2, set b equal to 1
  collection.updateOne({ a : 2 }
    , { $set: { b : 1 } }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated the document with the field a equal to 2");
    callback(result);
  });
}

const removeDocument = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Delete document where a is 3
  collection.deleteOne({ a : 2, b: 1 }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Removed the document with the field a equal to 3");
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

// app.get('/*', function (req, res, next){
//   const html = `
//     <div>
//     this is express app ceshi!
//     </div>
//   `
//   res.send(renderFullPage(html))
// })

// function renderFullPage(html) {
//   return `
//     <!doctype html>
//     <html>
//       <head>
//         <title>ChatMe</title>
//         <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />
//       </head>
//       <body>
//         <div id="root">${html}</div>
//       </body>
//     </html>
//     `
// }

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

console.log('express app is listen on port 9093');