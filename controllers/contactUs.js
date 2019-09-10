
//  person visiting the website and contacting for help
//  contact to website api 

var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var ContactUs = require("../models/contactUs");
// importing nodemail npm module for sending the mail for feedback
const nodemailer = require('nodemailer');

//transporter for using the service of any mail provider
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        // username of gmail and password 
        user: 'harshddevil.hk93@gmail.com',  
        pass: 'Jackalpower1@'                  
    }
});

function sendEmail(mail) {
    var mailOptions = {
        from: 'harshddevil.hk93@gmail.com',
        to: mail.to,
        subject: 'Sending Email for contacting',
        html: `<h3>Dear ${mail.first_name},</h3>

        We received your enquiry about our company policies. Thank you so much for your interest! We've many policies form customers like you.
        Please find attached to this email details on the various policies available. 
        <br><b>These are our agent phone number near your locality:<br>
        +91 123456789 (Mr XYZ)<br>
        +91 987654321 (Mr ABC)
        </b><br>
        We look forward to seeing you soon so that you can enjoy our services.<br>
        
        Please, do contact us if you have additional queries. Thanks again!<br>
        <h2>
        Best regards, <br>
        
        Kanhaiya Kumar <br>
        
        Sales Representative, Indian Insurance Company
        </h2>`

    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

/***************************API FOR CONTACT US **************************** */
var contactusController = {};

//contact us api 
contactusController.save = function (req, res) {
    let contactus = new ContactUs({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        contact: req.body.contact,
        message:req.body.message
    });

    // mail object is used to be passed in the parameter of sendEmail() f
    var mail = {
        to: req.body.email,
        first_name: req.body.first_name,

    }
    contactus.save((err, contactUs) => {
        if (err) {
            return res.json({
                success: false,
                err
            });
        } else {
            res.send(contactus)
            //sendEmail(mail);

        };
    });
};

//fetching data from the database for user that contacted 
//get api for  contact us 
contactusController.list = function (err, res) {

    ContactUs.find({}).exec(function (err, contactus) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.send(contactus);
        }
    });
}


//fetching data from the database for user that contacted and deleting them
//delete  api for contact us 
// Delete an employee
contactusController.delete = function (req, res) {

    ContactUs.deleteOne({ _id: req.params.id }, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Person data deleted deleted!");
            res.redirect("/contactus");
        }
    });
}

//exporting the contact us controller 
module.exports = contactusController;

