const mongoose = require('mongoose');


const uri = 'mongodb+srv://abcd:abcd@kanhaiya-amndo.mongodb.net/employee?retryWrites=true&w=majority'

const options = {
  useNewUrlParser: true,
};

mongoose.connect(uri, options).then(
  () => {
    console.log("online mongo atlas database connected");
  },
  err => {
    console.log("Error", err)
  }
);