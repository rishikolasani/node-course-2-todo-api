var express = require('express');
var bodyParser= require('body-Parser');

var {mongoose}= require('./db/mongoose.js');
var {user}=  require('./models/user.js');
var {Todo}=  require('./models/Todo.js');


var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
var todo = new Todo({
  text:req.body.text
});
todo.save().then((doc)=>{
  res.send(doc);
},(e)=>{
  res.send(e);
});
});



app.listen(3000,()=>{
  console.log('started on port 3000');
});
