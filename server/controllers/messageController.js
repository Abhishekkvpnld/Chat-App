const messageModel = require("../model/messageModel");

module.exports.addMessage = async(req,res,next)=>{
    try{
        console.log(req.body)
const {from,to,message} = req.body;
const data = await messageModel.create({
    message:{
        text:message
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

}