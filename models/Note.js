const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
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

module.exports = {Note} = mongoose.model('notes',NoteSchema);