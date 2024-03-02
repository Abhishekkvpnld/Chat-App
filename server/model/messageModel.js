const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
   message:{
    text:{
      type:String,
      default:'text'
    },
    file:{
      type:String,
      default:'file'
    }
   },
   users:Array,
   sender:{
type:mongoose.Schema.Types.ObjectId,
ref:"user",
required:true,
   },
},
{
  timestamps:true,
})

module.exports = mongoose.model("Messages",messageSchema);