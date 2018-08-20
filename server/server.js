var express = require('express');
var bodyParser= require('body-Parser');
var {ObjectID}=require('mongodb');

var {mongoose}= require('./db/mongoose.js');
var {user}=  require('./models/user.js');
var {Todo}=  require('./models/Todo.js');


var app = express();
var port = process.env.PORT ||3000;

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
var todo = new Todo({
  text:req.body.text
});
todo.save().then((doc)=>{
  res.send(doc);
},(e)=>{
  res.status(400).send(e);
});
});

app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    res.send( {todos});
  },(e)=>{
    res.status(400).send(e);
})
});
app.get('/todos/:id',(req,res)=>{
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findById(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});


  }).catch((e)=>{
    res.status(400).send();
  });
});

app.delete('/todos/:id',(req,res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findByIdandRemove(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
  }).catch(e)=>{
    res.status(404).send();
  };
  });

});

app.listen(port,()=>{
  console.log(`started on port ${port}`);
});
module.exports={
  app
};
