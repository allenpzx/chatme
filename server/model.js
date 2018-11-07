const mongoose = require('mongoose');
const DB_NAME = `chatme`;
const DB_URL = `mongodb://localhost:27017`;
mongoose.connect(`${DB_URL}/${DB_NAME}`, { useNewUrlParser: true });
const db = mongoose.connection;

const models = {
    user: {
        'account': {'type': String, 'required': true},
        'password': {'type': String, 'required': true},
        'name': {'type': String},
        'age': {'type': Number},
        'gender': {'type': String, 'required': true},
        'avatar': {'type': String},
        'description': {'type': String},
        'wanna': {'type': String},
    },
    chat: {
        "chatid": {type: String, require: true},
        "from": {type: String, require: true},
        "to": {type: String, require: true},
        "content": {type: String, require: true, default: ''},
        "read": {type: Boolean, default: false},
        "create_time": {type: Number, default: new Date().getTime()}
    }
}

for(let m in models){
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function (name){
        return mongoose.model(name)
    }
}