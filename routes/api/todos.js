const express = require('express');
var router = express.Router();

//Load Model
const Todo = require('./../../models/Todo');

router.get('/todos',(req,res)=>{
    Todo.find()
    .then(todos=>{
        if(todos){
            res.json(todos);
        }else{
            res.status(404).json({errors : 'Todos not found'});
        }
    })
    .catch(err=>{
        res.json(err);
    })
});

router.post('/todos',(req,res)=>{
    var todo = new Todo({
        text : req.body.text
    });

    todo.save()
    .then(todo=>{
        res.json(todo);
    })
    .catch(err=>{
        res.json(err);
    })
});



//Get Today's todos
router.get('/todos/today',(req,res)=>{
    var date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
    Todo.find({date: {
        $gte: new Date(date+"T00:00:00.000Z"),
        $lt: new Date(date+"T23:59:59.000Z")
      }})
    .then(todos=>{
       if(!todos){
            res.status(404).json({'errors' : 'Todos not found'});
        }
        res.json(todos);
    })
    .catch(err=>{
        res.json(err);
    })
})



module.exports = router;