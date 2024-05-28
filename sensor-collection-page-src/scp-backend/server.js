const http = require('http');
const https = require('https')
const app = require('./app');
var fs = require('fs');


const httpPort = process.env.PORT ?? 8081;
const httpsPort = process.env.PORT ?? 8444;

var httpsOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/feta5.fit.vutbr.cz/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/feta5.fit.vutbr.cz/fullchain.pem')
};

const httpserver = http.createServer(app);
const httpsServer = https.createServer(httpsOptions, app);

httpserver.listen(httpPort);
httpsServer.listen(httpsPort);

console.log(`listening on ${httpPort} - HTTP, ${httpsPort} - HTTPS`)