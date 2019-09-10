'use strict'

var winston = require('winston');
var fs = require('fs');
var path = require('path');
var env = process.env.NODEJSENV || 'localhost'
var logDir = 'logs';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
var format = winston.format;

var tsFormat = () => (new Date()).toLocaleString();
var logger = winston.createLogger({
    level: env === 'dev' ? 'verbose' : 'info',
    format: format.combine(
        format.timestamp({
            format: tsFormat
        }),
        format.json()
    ),
    transports: [
        new winston.transports.Console({
            format: format.combine(
                format.timestamp({
                    format: tsFormat
                }),
                format.colorize(),
                format.printf(
                    info => `${info.timestamp}: ${info.level}: ${info.message}`
                )
            )
        }),
        new (require('winston-daily-rotate-file'))({
            filename: '%DATE%-logs.log',
            dirname: logDir,
            timestamp: tsFormat,
            datePattern: 'YYYY-MM-DD',
            maxSize: '2m'
        })
    ]
});

module.exports = logger;