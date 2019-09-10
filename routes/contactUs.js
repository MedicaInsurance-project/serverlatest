var express = require('express');
var router = express.Router();

var contactus = require("../controllers/contactUs");


// ContactUs  customer api router
router.post('/create', function (req, res) {
    contactus.save(req, res);
});

//showing list of all contacted person
//get api for contact us

router.get('/', function (req, res) {
    contactus.list(req, res);
});

//deleting the data of a given person 
//delete api

router.post('/delete/:id', function (req, res) {
    contactus.delete(req, res);
})


module.exports = router;