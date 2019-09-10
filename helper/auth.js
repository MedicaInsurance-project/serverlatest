"use strict";

var jwt = require("jsonwebtoken");
var config = require('../config/config');
var sharedSecret = config.sharedSecret;
var issuer = config.issuer;
var cacheService = require('./cache')();

//Here we setup the security checks for the endpoints
//that need it (in our case, only /protected). This
//function will be called every time a request to a protected
//endpoint is received


module.exports = function () {
  return {
    verifyToken: function (req, authOrSecDef, scopes, callback) {

      function sendError() {
        var response = {};
        response.code = 0;
        req.ph.response = response;
        response.code = -1;
        return;
      }

      //validate the 'Authorization' header. it should have the following format:
      //'Bearer tokenString'
      var token;
      //Try to get the token from headers. 
      token = req.headers.authToken;

      if (token) {
        jwt.verify(token, sharedSecret, function (verificationError, decodedToken) {
          //check if the JWT was verified correctly
          if (verificationError == null && decodedToken && decodedToken.role) {
            // check if the role is valid for this endpoint
            var roleMatch = config.roles.indexOf(decodedToken.role) != -1;
            // check if the issuer matches
            var issuerMatch = decodedToken.iss == issuer;
            // check if the token is expired.
            var now = new Date().getTime();
            var expirationMatch = now <= decodedToken.expiring;

            // you can add more verification checks for the
            // token here if necessary, such as checking if
            // the username belongs to an active user etc.

            if (roleMatch && issuerMatch && expirationMatch) {
              //add the token to the request so that we
              //can access it in the endpoint code if necessary
              req.auth = decodedToken;
              //if there is no error, just return null in the callback. Also, add the token to cache with sliding expiration.
              cacheService.extendToken(token, config.tokenExpiringSeconds);
              return callback(null);
            } else {
              //return the error in the callback if there is one
              return callback(sendError(req));
            }
          } else {
            //return the error in the callback if the JWT was not verified
            return callback(sendError(req));
          }
        });
      }
      else {
        return callback(sendError(req));
      }
    },
    issueToken: function (username, role) {
      var now = new Date();
      var expirationTime = now.getTime() + parseInt(config.tokenExpiringSeconds);

      var token = jwt.sign(
        {
          sub: username,
          iss: issuer,
          role: role,
          expiring: expirationTime
        },
        sharedSecret
      );
      //Store the token in cache
      cacheService.set(token, config.tokenExpiringSeconds);
      return token;
    },
    getTokenObject: function (token) {
      var result = {};
      if (token) {
        jwt.verify(token, sharedSecret, function (verificationError, decodedToken) {
          if (verificationError == null && decodedToken && decodedToken.role) {
            result = {
              'sub': decodedToken.sub,
              'iss': decodedToken.iss,
              'role': decodedToken.role,
              'expiring': decodedToken.expiring,
            };
          }
        });
      }
      return result;
    }
  }
}
