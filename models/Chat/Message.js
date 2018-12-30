const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MessageSchema = new Schema({
    text : {
        type : String,
        required : true,
        trim : true
    },
    sender : {
        type : String,
        required : true,
    },
    time : {
        type : Date,
        default : Date.now()
    }
});

module.exports = {Message} = mongoose.model('messages',MessageSchema);