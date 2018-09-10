const mongoose = require('mongoose');
var Example = mongoose.model('Example',{
  text:{
    type:String,
    required:true,
    minlength:1,
    trim:true,
    unique:true
  },
  sfdc_id:{
    type:String,
    unique:true

  },
  completedAt:{
    type:Number,
    default:null
  }
});



module.exports={Example};
