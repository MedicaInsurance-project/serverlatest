module.exports = function () {
    var env = process.env.NODEJSENV || 'localhost';

    var common = {
        serverPort: 8089,
        sharedSecret: 'ThisWillBeYourSecretKeyReplaceItWithAMoreSecuredString',
        issuer: 'www.myawesomedomain.com',
        tokenExpiringHours: 24,
        roles: ['admin', 'dealer', 'user'],
        tokenExpiringSeconds: 1800
    };

    var environment = {
        localhost: {
            appName: 'ProvideSomethingNiceHere',
            swaggerDocHost: 'localhost:8089',
            swaggerDocScheme: 'http',
        }
    };

    return Object.assign(common, environment[env]);

}();