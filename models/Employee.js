var mongoose = require('mongoose');


var EmployeeSchema = new mongoose.Schema({
  userID: String,
  name: String,
  phone: Number,
  password: String,
  updated_at: { type: Date, default: Date.now },
});

var Employee =mongoose.model('Employee', EmployeeSchema);
module.exports = Employee;