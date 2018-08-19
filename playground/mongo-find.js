//var MongoClient=require('mongodb').MongoClient;
const {MongoClient,ObjectId}=require('mongodb');// we can use the objectify declaration as well
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('something went wrong');
  }
  console.log('connected to Mongo db server');
  //db.collection('Todo').find().toArray().then((docs)=>{
  /*  db.collection('Todo').find({
      _id: new ObjectId("5b7981c333c9e10e94add222")
    }).toArray().then((docs)=>{
    console.log('Todo');
    console.log(JSON.stringify(docs,undefined,2));
  },(err)=>{
    conole.log('unable to fetch Todos',err);

  });*/
/*  db.collection('Todo').find().count().then((count)=>{
  console.log(`Todo count :${count}`);
},(err)=>{
  conole.log('unable to fetch Todos',err);

});*/
db.collection('users').find({name:'shy'}).toArray().then((docs)=>{
  console.log('users');
  console.log(JSON.stringify(docs,undefined,2));
},(err)=>{
  console.log('unable to fetch users',err);
});


  //  db.close();
  });
