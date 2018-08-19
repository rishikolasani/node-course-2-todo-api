var MongoClient=require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('something went wrong');
  }
  console.log('connected to Mongo db server');
 db.collection('Todo').insertOne({
    name:'something to do',
    completed:false
  },(err,result)=>{
    if(err){
      return console.log(err);
    }
    console.log(JSON.stringify(result.ops,undefined,2));
  });
db.collection ('users').insertOne({
  name:'Richie',
  age:23,
  location:'atlanta'
},(err,result)=>{
  if(err){
    return console.log(err);
  }
  console.log(JSON.stringify(result.ops,undefined,2));

});

  db.close();
});
