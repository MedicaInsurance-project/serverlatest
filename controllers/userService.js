'use strict';

const connection = require('../connection/connection');
var cryptography = require('../helper/cryptography');
var cacheService = require('../helper/cache')();
var authService = require('../helper/auth')();
const userDal = require('../models/userDal')();


//This API checks whether user exists in database or not and return its data
module.exports.userLoginPOST = function (req, res, next) {

    res.setHeader('Content-Type', 'application/json');
    var _params = req.swagger.params;
    
    var user = {};

    if (_params.phone.value) {
            user.phone = _params.phone.value;
    }

    if (_params.password.value){
        // console.log(_params.password);
        user.password = cryptography.sha256(_params.password.value);
    }
    if (_params.phone.value && _params.password.value) {
        userDal.userLoginPOST(user, function (err, userDetails) {
            if (err) {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, data: null, message: "Invalid parameters." }));
            }
            else {
                //Here we have successful login. Now store the token in cache.
                var token = authService.issueToken(userDetails.userId, userDetails.userType);
                res.setHeader("authToken", token);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: true, data: userDetails, message: 'User logged in successfully!' }));
            }
        });
    }
    else {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, data: null, message: "Invalid parameters." }));
    }
}