const log4js = require('log4js');

log4js.configure({
    appenders: {
        file: {
            type: 'DateFile',
            filename: 'logs/app',
            pattern: '-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        }
    },
    categories: {
        default: {
            appenders: ['file'],
            level: 'debug'
        }
    }
})

module.exports = log4js.getLogger()