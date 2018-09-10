var env=process.env.NODE_ENV||'development';

if(env==='development'){
  process.env.PORT=3000;
  process.env.MONGODB_URI= "mongodb://localhost:27017/example";
  //"mongodb+srv://rishi_Kolasani:navomi123!@cluster0-d9aju.mongodb.net/Todo?retryWrites=true";
  //;

}else if(env==='test'){
  process.env.PORT=3000;
  process.env.MONGODB_URI='mongodb://localhost:27017/TodoAppTest';
}
