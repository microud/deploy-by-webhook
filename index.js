/**
 * Created by microud on 10/24/16.
 */

var http = require('http');
var createHandler = require('github-webhook-handler');
var process = require('child_process');
var log4js = require('log4js');

var listenPort = 7777;
var logDirectory = '/var/log/webhook/webhook.log';
var githubSecret = 'yourSecret';

var handler = createHandler({ path: '/webhook', secret: githubSecret });

log4js.configure({
    appenders: [
        {
            type: 'console',
            category: 'console'
        }, //stdout
        {
            type: 'file',
            filename: logDirectory,
            maxLogSize: 104800,
            backups: 100,
            category: 'normal'
        }
    ],
    "replaceConsole": true
});
var logger = log4js.getLogger('webhook');
logger.setLevel('INFO');

http.createServer(function (req, res) {
    handler(req, res, function (err) {
        res.statusCode = 404;
        res.end('no such location');
        logger.warn('Someone trying to access an unexisit page');
    });
    logger.info('Webhook listener started on port 7777');
}).listen(listenPort, '0.0.0.0');

handler.on('error', function (err) {
    logger.info(err.message);
});

handler.on('push', function (event) {
    logger.info('Received a push event for %s to %s',
        event.payload.repository.name,
        event.payload.ref);
    logger.info('Start executing the deploy shell script');
    process.exec('sh deploy.sh', function(err, stdout, stderr) {
        if(err) {
            logger.error(error.stack + 'Error code: ' + error.code);
        }
    });
});

handler.on('issues', function (event) {
    logger.info('Received an issue event for %s action=%s: #%d %s',
        event.payload.repository.name,
        event.payload.action,
        event.payload.issue.number,
        event.payload.issue.title)
});
