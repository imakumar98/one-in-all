const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const cors = require('cors');

//Load database URL
const Keys = require('./config/keys');

//Load APIs
const todos = require('./routes/api/todos');
const notes = require('./routes/api/notes');
const messages = require('./routes/api/messages');

//port
const port= process.env.PORT || 5000;


//Message model
const Message = require('./models/Chat/Message');

app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//MongoDB Connection
mongoose.connect(Keys.mongoURL,{ useNewUrlParser: true }).then(()=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log('Database connection failed');
});



//Sockets.IO
io.on('connection', function(socket) {
    console.log('A user connected');
    socket.on('message',(newMessage)=>{
        var message = new Message(newMessage);
        message.save()
        .then((message)=>{
            io.sockets.emit('broadcast',newMessage);
        })
        .catch(err=>{
            console.log(err);
        })
        
    })

   
   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });
});



//SET Routes
app.use('/api',todos);
app.use('/api',notes);
app.use('/api',messages);



http.listen(port, function() {
    console.log('listening on *:5000');
 });