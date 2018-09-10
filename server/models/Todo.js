const mongoose = require('mongoose');
var Todo = mongoose.model('Todo',{
  text:{
    type:String,
    required:true,
    minlength:1,
    trim:true
  },
  completed:{
    type:Boolean,
    default:false
  },
  completedAt:{
    type:Number,
    default:null
  }
});
module.exports={
  Todo
};


/*var Todo2 = new Todo({
  text:{
    type:String,
    required:true,
    minlength:1,
    trim:true
  },
  sfdc_id:{
    type:String,
    default:true
  },

});

Todo2.save().then((doc)=>{
  console.log('new Todo saved',doc);

},(e)=>{
  return console.log('unable to create a new Todo',e);
});*/
