var express = require('express');
var router = express.Router();
var Users = require("../controllers/customerController.js");
var user = require('../controllers/userService');

module.exports.userLoginPOST = function (req, res, next) {
  console.log('post method');
  user.userLoginPOST(req, res, next);
};

// Get all Userss
router.get('/', function (req, res) {
  Users.list(req, res);
});

// Get single Users by id
router.get('/show/:id', function (req, res) {
  Users.show(req, res);
});

/*
  ! Router api not in function 
// Create Users
router.get('/create', function (req, res) {
  Users.create(req, res);
});

*/

// Save Users

// http://localhost:8080/users
router.post('/save', function (req, res) {
  Users.save(req, res);
});


/* 

// Edit Users
  ! Router api not in function 


router.get('/edit/:id', function (req, res) {
  Users.edit(req, res);
});

*/


//  update the data of the users
// http://localhost:8080/users/update/_id

router.put('/update/:id', function (req, res) {
  Users.update(req, res);
});

// Delete the data of the user/customer

router.delete('/delete/:id', function (req, res, next) {
  Users.delete(req, res);
});

module.exports = router;
