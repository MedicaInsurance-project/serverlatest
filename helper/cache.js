'use strict'

const NodeCache = require("node-cache");
const myCache = new NodeCache();

module.exports = function () {
    return {
        set: function (_key, _value, _expiring) {
            myCache.set(_key, _value, _expiring);
        },
        get: function (_key) {
            return myCache.get(_key);
        },
        delete: function (_key) {
            value = myCache.del(_key);
        },
        extendToken: function (_key, _expiring, callback) {
            myCache.ttl(_key, _expiring, function (err, changed) {
                if (!err) {
                    callback(true);
                }
                else {
                    callback(false);
                }
            });
        }
    }
};