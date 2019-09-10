var mongoose = require("mongoose");
var Users = require("../models/Users");
const Joi = require('Joi');
//mongoose.set('findByIdAndUpdate', false);

var customerController = {};

// Show list of users
customerController.list = function (req, res) {
  Users.find({}).exec(function (err, users) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      // res.render("../views/users/index", {users: users});
      res.send(users);
    }
  });

};

// Show Users by id
customerController.show = function (req, res) {
  Users.findOne({ _id: req.params.id }).exec(function (err, users) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.send(users)
    }
  });
};

/*

    ! Not in function 
// Create new Users
customerController.create = function (req, res) {
  res.render("../views/users/create");
}; 

*/

// Save new Users
customerController.save = function (req, res) {

  var users = new Users(req.body);
  const schema = Joi.object().keys({
    userID: Joi.string(),
    name: Joi.string(),
    phone: Joi.number(),
    password: Joi.string()
  });
  Joi.validate(req.body, schema, (err, response) => {
    if (err) {
      console.log('error occured');
      console.log(err)
    } else {
      users.save(function (err) {
        if (err) {
          console.log(err);
          response.render("../views/users/create");
        } else {
          console.log("Successfully created an Users.");
          res.send(users);
        }
      })

    }

  })


};
/* 
    ! Not in function now
// Edit an Users
customerController.edit = function (req, res) {
  Users.findOne({ _id: req.params.id }).exec(function (err, Users) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/users/edit", { Users: Users });
    }
  });
};

*/

// Update an Users
customerController.update = function (req, res) {

  Users.findByIdAndUpdate(req.params.id, {
    $set: { name: req.body.name, phone: req.body.phone}
  } ,{useFindAndModify: false}, function (err, Users) {
      if (err) {
        console.log(err);
      } else {
        res.send(Users)
      }
    });
};

// Delete an Users
customerController.delete = function (req, res) {
  Users.remove({ _id: req.params.id }, function (err) {
    if (err) {
      console.log(err);
    }
    else {
      res.send({
        message:"Data deleted sucessfully"
      
      })
    }
  });
};

module.exports = customerController;
