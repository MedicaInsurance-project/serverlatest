'use strict';

var crypto = require("crypto");

module.exports.sha256 = function sha256(text) {
    var sha256 = crypto.createHash("sha256");
    sha256.update(text, "utf8");//utf8 here
    var result = sha256.digest("hex");
    return result;
};
