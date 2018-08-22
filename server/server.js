require('./config/config.js');

var express = require('express');
var bodyParser= require('body-Parser');
var {ObjectID}=require('mongodb');
const _ = require('lodash');

var {mongoose}= require('./db/mongoose.js');
var {User}=  require('./models/user.js');
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
/*app.get('/todos/:id',(req,res)=>{
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
});*/

app.patch('/todos/:id',(req,res)=>{
  var id = req.params.id;
  var body=_.pick(req.body,['text','completed']);
});

/*app.delete('/todos/:id',(req,res)=>{
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

});*/
app.post('/users',(req,res)=>{
  var body = _.pick(req.body,['email','password']);
  var user= new User(body);
  req.user = user;
  user.save().then(()=>{
    return user.generateAuthToken();

   }).then((token)=>{
      res.header('x-auth',token).send(user);
    }).catch((e)=>{
      res.status(400).send(e);



  });

});

app.get('/users/me',(req,res)=>{
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

});

app.listen(port,()=>{
  console.log(`started on port ${port}`);
});
module.exports={
  app
}
