const messageModel = require("../model/messageModel");

module.exports.addMessage = async(req,res,next)=>{
    try{
        console.log(req.body)
const {from,to,message,file} = req.body;
const data = await messageModel.create({
    message:{
        text:message,
        file:file
    },
    
    users:[from,to],
    sender:from,
})
if(data){
    return res.json({msg:'message added successfully'})
}else{
    return res.json({msg:'Failed to add message to the server'})
}
    }catch(ex){
next(ex)
    }
}

module.exports.getAllMessage = async(req,res,next)=>{
try{
const {from,to} = req.body;
console.log(req.body)
const messages =await messageModel.find({users:{
    $all:[from,to]
}}).sort({updatedAt:1});
const projectMessages = messages.map((msg)=>{
    return {
        fromSelf:msg.sender.toString() === from,
        message:msg.message.text,
    }
})
res.json(projectMessages) 
}catch(ex){
    next(ex)
}
}