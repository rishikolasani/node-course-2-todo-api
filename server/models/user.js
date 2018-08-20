const mongoose = require('mongoose');

var user = mongoose.model('user',{
  email:{
    type:String,
    required:true,
    minlength:1,
    trim:true
  }
});
module.exports={
  user
}
/*var newUser = new user({
  email:'Richie@gmail.com'
});


newUser.save().then((doc)=>{
  console.log('new user created',doc);

},(e)=>{
  console.log(e);
});*/
