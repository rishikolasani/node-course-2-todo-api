const {mongoose}=require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/Todo.js');
const {User} = require('./../server/models/user.js');
//var id ='5b7ac9cc0d91d84b648986e3';


/*Todo.find({
  _id:id
   }).then((todos)=>{
  console.log('Todos',todos);

}).catch(e)=>{
  return console.log(e);
};*/


/*Todo.findOne({
  _id:id
   }).then((todo)=>{
  console.log('Todo',todo);

}).catch(e)=>{
  return console.log(e);
};


Todo.findById(id).then((todo)=>{
  console.log('Todo',todo);

}).catch(e)=>{
  return console.log(e);
};*/
User.findById('5b79bde04a60281504d27c51').then((user)=>{
  if(!user){
    return console.log('something went wrong',)
  }
  console.log(JSON.stringify(user,undefined,2));
},(e)=>{
  console.log(e);

});
