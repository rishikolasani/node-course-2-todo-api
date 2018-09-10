require('./config/config.js');

var express = require('express');
var bodyParser= require('body-Parser');
var {ObjectID}=require('mongodb');
const _ = require('lodash');

var {mongoose}= require('./db/mongoose.js');
var {User}=  require('./models/user.js');
var {Todo}=  require('./models/Todo.js');
var {Example}=require('./models/example.js');



var app = express();
var port = process.env.PORT ||3000;
//example.example();

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

app.patch('/todos/:id',(req,res)=>{
  var id = req.params.id;
  var body=_.pick(req.body,['text','completed']);
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  if(_.isBoolean(body.completeed)&& body.completed){
    body.competedAt=new Date().getTime();
  }else{
    body.completed=false;
    body.completedAt=null;

  }
  Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
    if(!todo){
      return res.status(400).send();

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
  Todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
  }).catch((e)=>{
    res.status(404).send();
  });
});


app.post('/users',(req,res)=>{
  var body = _.pick(req.body,['email','password']);
  var user= new User(body);
  user.save().then((user)=>{

    return user.generateAuthToken();

   }).then((token)=>{
      res.header('x-auth',token).send(user);
    }).catch((e)=>{
      res.status(400).send(e);



  });

});




app.post('/users/login',(req,res)=>{
  var body = _.pick(req.body,['email','password']);


   User.findByCredentials(body.email,body.password).then((user)=>{
     res.send(user);
   }).catch((e)=>{
     res.status(400).send();
   });
});

/*app.get('/users/me',(req,res)=>{
  var token = req.header('x-auth');


  User.findByToken(token).then((user)=>{
    if(!user){
      return promise.reject();

    }
    res.send(req.user);
    console.log(req.user);

  }).catch((e)=>{
    res.status(401).send();
  });

});*/
app.post('/example',(req,res)=>{
var example = new Example({
  text:req.body.text
});
example.save().then((doc)=>{
  res.send(doc);
},(e)=>{
  res.status(400).send(e);
});
});

app.listen(port,()=>{
  console.log(`started on port ${port}`);
});
module.exports={
  app
}
