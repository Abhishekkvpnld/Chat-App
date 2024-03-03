const express = require('express')
const cors = require('cors');
const mongoose = require("mongoose");
const userRoutes = require('./routes/userRoutes')
const MessageRoute = require('./routes/messageRoute')
const socket = require('socket.io')
const logger = require('morgan');
const bodyParser = require("body-parser")

const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));


app.use('/api/auth',userRoutes);
app.use('/api/messages',MessageRoute) 

mongoose.connect(process.env.ATLAS_URL,{
    // useNewUrlParser:true, 
    // useUnifiedTopology:true,   
}).then(()=>{
    console.log('DB Connection successfull')
}).catch((err)=>{
    console.log(err.message) 
})

const server = app.listen(process.env.PORT,()=>{
    console.log(`server connected on Port ${process.env.PORT}`)
})

const io = socket(server,{
    cors:{
        origin:"http://localhost:3000",
        Credential:true,
    }
})

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;

    socket.on("add-user", (userId) => {
        global.onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = global.onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
    });
});