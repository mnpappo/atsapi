var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');


var databaseUri = process.env.DATABASE_URI || process.env.MONGOLAB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://atsuser:atsuser123@ats-api-2236.mongo.dbs.appsdeck.eu/ats-api-2236',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  javascriptKey: process.env.JAVASCRIPT_KEY || 'jsKey',
  masterKey: process.env.MASTER_KEY || 'masterKey', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'https://ats-api.scalingo.io/parse', // Don't forget to change to https if needed
  liveQuery: {
    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  }
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// controllers
var index = require('./controllers/index');
var user = require('./controllers/user');
var company = require('./controllers/company');
var asset = require('./controllers/asset');

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// enableRevocableSession
// Parse.User.enableRevocableSession()


// bind controllers with url pattern

 app.use('/parse/', index);
 app.use('/parse/users', user);
 app.use('/parse/companies', company);
 app.use('/parse/assets', asset);

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
  console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);

// module.exports = app;
