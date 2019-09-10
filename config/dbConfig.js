'use strict';

module.exports = function () {
    var env = process.env.NODEJSENV || 'localhost';
    var common = {
        driver: 'pg'
    };

    var environment = {
        localhost: {
            config: {
                user: '',
                host: '',
                database: '',
                password: '',
                port: 5432
            }
        },
        dev: {
            config: {
                user: '',
                host: '',
                database: '',
                password: '',
                port: 5432
            }
        },
        qa: {
            config: {
                user: '',
                host: '',
                database: '',
                password: '',
                port: 5432
            }
        },
        prod: {
            config: {
                user: '',
                host: '',
                database: '',
                password: '',
                port: 5432
            }
        }
    };

    if (!env) env = 'localhost';
    return Object.assign(common, environment[env]);
}();
