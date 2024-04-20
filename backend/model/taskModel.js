const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  completed: {
    type: Boolean,
    default: false,
  },
  Date:{
type:Number,
required:true
  },
  color:{
type:String,
required:true

  },
  
    userId:{
        type:String
    }

  ,
  username:String,
  role: {
    type: String,
    enum:["admin","user"],
    default: 'user', 
  },
 
  
  
 
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
