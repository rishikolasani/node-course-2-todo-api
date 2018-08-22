const {SHA256}= require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt =require('bcryptjs');

var password = 'abc123!';

/*bcrypt.genSalt(10,(err,salt)=>{
  bcrypt.hash(password,salt,(err,hash)=>{
    console.log(hash);
  });
});*/

 var hashedPassword='$2a$10$r0/CxXExuZ9mlOCMlZwwDu1d6V1zVDekB0hb/Qj1uYX5BSug.PD6O';


 bcrypt.compare(password,hashedPassword,(err,res)=>{
   console.log(res);
 });










/*var data ={
  id:10
};


var token = jwt.sign(data,'123abc');
console.log(token);

var decoded = jwt.verify(token,'123abc');
console.log('edcoded:',decoded);


/var message ='i am user number 3';
var hash = SHA256(message).toString();

console.log(`message: ${message}`);
console.log('crypted with SHA256:', hash);


var data ={
  id:4
};
 var token={
   data ,
   hash:SHA256(JSON.stringify(data) +'someSceret').toString()
 };


  var resultHash = SHA256(JSON.stringify(token.data)+'someSceret').toString();


  if(resultHash===token.hash){
    console.log('result is not changed');
  }else {
    console.log('result has been changed do not trust');
  }*/
