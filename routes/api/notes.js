const express = require('express');
var router = express.Router();

//Load Model
const Note = require('./../../models/Note');


//Notes Routes
router.post('/notes',(req,res)=>{
    var note = new Note({
        text : req.body.text
    });

    note.save()
    .then(note=>{
        res.json(note);
    })
    .catch(err=>{
        res.json(err);
    })

})

router.get('/notes',(req,res)=>{
    Note.find()
    .then(notes=>{
        res.json(notes);
    })
    .catch(err=>{
        res.json(err);
    })
})

module.exports = router;