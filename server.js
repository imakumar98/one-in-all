const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var app = express();

const Keys = require('./config/keys');

//Load Model
const Todo = require('./models/Todo');

//port
const port= process.env.PORT || 3000


app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//MongoDB Connection
mongoose.connect(Keys.mongoURL,{ useNewUrlParser: true }).then(()=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log('Database connection failed');
});

app.post('/todos',(req,res)=>{
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

})

app.get('/todos',(req,res)=>{
    

    Todo.find()
    .then(todos=>{
        res.json(todos);
    })
    .catch(err=>{
        res.json(err);
    })

})



app.listen(port,()=>{
    console.log("Server started at port 3000");
})