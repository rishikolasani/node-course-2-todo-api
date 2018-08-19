//var MongoClient=require('mongodb').MongoClient;
const {MongoClient,ObjectId}=require('mongodb');// we can use the objectify declaration as well
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('something went wrong');
  }

db.collection('Todo').findOneAndUpdate({_id:new ObjectId("5b79961633c9e10e94add795")},{
  $set:{
    completed:true
  }//,
//  $inc{
    //age:1
  //}
},{
  returnOriginal:false
}

).then((result)=>{
  console.log(result);


});


  //  db.close();
}  );
