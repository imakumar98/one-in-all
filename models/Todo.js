const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TodoSchema = new Schema({
    text : {
        type : String,
        required : true,
        trim : true
    },
    date : {
        type : Date,
        default : Date.now()
    }
});

module.exports = {Todo} = mongoose.model('todos',TodoSchema);