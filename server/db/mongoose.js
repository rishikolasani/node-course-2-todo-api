var mongoose = require('mongoose');

mongoose.promise =global.promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });

module.exports={
  mongoose
};
