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
    // dateOnly : {
    //     type : String,
    //     default : new Date().getUTCDate() + '-' + (new Date().getUTCMonth() + 1) + '-' + new Date().getUTCFullYear()
    // }
});

module.exports = {Todo} = mongoose.model('todos',TodoSchema);