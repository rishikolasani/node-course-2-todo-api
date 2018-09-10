const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _=require('lodash');
const bcrypt=require('bcryptjs');

var Schema= mongoose.Schema;

var userSchema =  new Schema({
  email:{
    type:String,
    required:true,
    minlength:1,
    trim:true,
    unique:true,
    validate:{
       validator:validator.isEmail,
    /*{
      validator:(value)=>{
        return validator.isEmail(value);
      },*/
      message:'{value} is invalid email'
    }
  },
  password:{
    type:String,
    required:true,
    minlength:6
  },
  tokens:[{
    access:{
      type:String,
      required:true

    },
    token:{
      type:String,
      required:true

    }
  }]
});
userSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject,['_id','email']);
};

userSchema.methods.generateAuthToken = function(){
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();
  console.log(token);
  user.tokens = user.tokens.concat([{access,token}]);

  return user.save().then(()=>{
    return token;
  });
};

userSchema.statics.findByToken = function(token){
  var User = this;
  var decoded;
  try{
    decoded=jwt.verify(token,'abc123');

  }catch(e){
  //  return new promise((resolve,reject)=>{
  //   //      reject();
  //   //  return new promise.reject();
  //
  // });



  return  User.findOne({
    '_id':decoded._id,
      'tokens.token':token,
    'tokens.access':'auth'

  });
}};

userSchema.statics.findByCredentials =function(email,password){

  var user = this;
  return User.findOne({email}).then((user)=>{
    console.log();
    if(!user){
      return promise.reject();

    }
    return new promise((resolve,reject)=>{
      bcrypt.compare(password,user.password,(err,res)=>{
        if(res){
          resolve(user);
        }else{
          reject();
        }
      });
    });
  });

};

  userSchema.pre('save',function(next){
    var user = this;
    if(user.isModified('password')){
      bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(user.password,salt,(err,hash)=>{
          user.password=hash;
          next();

        });
      });
    }else{
      next();
    }

  });


var User= mongoose.model('User',userSchema);
module.exports={User};
/*var newUser = new user({
  email:'Richie@gmail.com'
});


newUser.save().then((doc)=>{
  console.log('new user created',doc);

},(e)=>{
  console.log(e);
});*/
