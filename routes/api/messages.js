const express = require('express');
var router = express.Router();

//Load Model
const Message = require('./../../models/Chat/Message');

router.get('/messages',(req,res)=>{
    Message.find()
    .then(messages=>{
        if(messages){
            res.json(messages);
        }else{
            res.status(404).json({errors : 'Todos not found'});
        }
    })
    .catch(err=>{
        res.json(err);
    })
});






module.exports = router;