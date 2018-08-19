//var MongoClient=require('mongodb').MongoClient;
const {MongoClient,ObjectId}=require('mongodb');// we can use the objectify declaration as well
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('something went wrong');
  }
/*  console.log('connected to Mongo db server');
db.collection('Todo').deleteMany({completed:false}).then((result)=>{
  console.log(result);


});*/
/*db.collection('Todo').deleteOne({text:"eat dinner"}).then((result)=>{
  console.log(result);


});*/
db.collection('Todo').findOneAndDelete({completed:false}).then((result)=>{
  console.log(result);


});


  //  db.close();
}  );
