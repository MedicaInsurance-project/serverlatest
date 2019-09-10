var mongoose = require('mongoose');


var customerSchema = new mongoose.Schema({
  userID: String,
  name: String,
  phone: Number,
  password: String,
  updated_at: { type: Date, default: Date.now },
});

var User =mongoose.model('User', customerSchema);
module.exports = User;