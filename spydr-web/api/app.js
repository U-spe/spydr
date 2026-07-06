var https = require('https');
var http = require('http');
var fetch = require('node-fetch');
var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8'));

var httpsAgent = new https.Agent({
  rejectUnauthorized: false,
  keepAlive: true,
});

var httpAgent = new http.Agent({
  rejectUnauthorized: false,
  keepAlive: true,
});

http.globalAgent.maxSockets = Infinity;
https.globalAgent.maxSockets = Infinity;

app.use(cookieParser());
app.use(session({
  secret: 'spydr-web',
  saveUninitialized: true,
  resave: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function base64Encode(data) {
  return Buffer.from(data).toString('base64');
}

function base64Decode(data) {
  return Buffer.from(data, 'base64').toString('ascii');
}

function rewriteURL(dataURL, option) {
  var websiteURL;
  var websitePath;

  if (option === 'decode') {
    websiteURL = base64Decode(dataURL.split('/').splice(0, 1).join('/'));
    websitePath = '/' + dataURL.split('/').splice(1).join('/');
  } else {
    websiteURL = base64Encode(dataURL.split('/').splice(0, 3).join('/'));
    websitePath = '/' + dataURL.split('/').splice(3).join('/');
  }

  if (websitePath === '/') return `${websiteURL}`;
  return `${websiteURL}${websitePath}`;
}

function error(statusCode, info) {
  return fs.readFileSync(path.join(__dirname, 'error.html'), 'utf8')
    .toString()
    .replace('%ERROR%',
      statusCode && info
        ? `Error ${statusCode}: ${info}`
        : statusCode
          ? `Error ${statusCode}`
          : info
            ? `Error: ${info}`
            : 'An error has occurred!'
    );
}

app.post('/createSession', async (req, res) => {
  if (req.body.url.startsWith('//')) req.body.url = 'http:' + req.body.url;
  else if (!req.body.url.startsWith('http')) req.body.url = 'http://' + req.body.url;

  if (req.body.rv) {
    req.session.rvURL = String(req.body.url).split('/').splice(0, 3).join('/');
    return res.redirect('/fetch/rv/' + String(req.body.url).split('/').splice(3).join('/'));
  }

  return res.redirect('/fetch/' + rewriteURL(String(req.body.url)));
});

var prefix = '/fetch';

app.use(prefix, async (req, res) => {
  var location = rewriteURL(req.url.slice(1), 'decode');

  if (req.url.startsWith('/rv') && !req.session.rvURL) {
    return res.send(error('400', 'No session URL found'));
  }

  if (req.url.startsWith('/rv') && req.session.rvURL) {
    location = req.session.rvURL + req.url.slice(3);
  }

  location = {
    href: location,
    hostname: location.split('/').splice(2, 1).join('/'),
    origin: location.split('/').splice(0, 3).join('/'),
    origin_encoded: base64Encode(location.split('/').splice(0, 3).join('/')),
    path: '/' + location.split('/').splice(3).join('/'),
    protocol: location.split(':').splice(0, 1).join('')
  };

  var headers = req.headers;
  headers['referer'] = location.href;
  headers['origin'] = location.origin;
  headers['host'] = location.hostname;

  var options = {
    method: req.method,
    headers: headers,
    redirect: 'manual',
    agent: (_parsedURL) => {
      return _parsedURL.protocol === 'http:' ? httpAgent : httpsAgent;
    }
  };

  if (req.method === 'POST') {
    try {
      options.body = JSON.stringify(req.body);
    } catch (e) {}
  }

  const response = await fetch(location.href, options).catch(() => {
    return res.send(error('404', 'Not found'));
  });

  if (!response || typeof response.buffer !== 'function') return;

  var resbody = await response.buffer();
  var contentType = response.headers.get('content-type') || 'text/html';

  var serverHeaders = Object.fromEntries(
    response.headers.raw
      ? Object.entries(response.headers.raw()).map(([k, v]) => [k, v[0]])
      : []
  );

  delete serverHeaders['content-encoding'];
  delete serverHeaders['x-frame-options'];
  delete serverHeaders['strict-transport-security'];
  delete serverHeaders['content-security-policy'];
  delete serverHeaders['location'];

  res.status(response.status);
  res.set(serverHeaders);
  res.contentType(contentType);

  if (contentType.startsWith('text/html')) {
    resbody = resbody.toString().replace(/<title>(.*?)<\/title>/gi, '<title>Spydr Web</title>');
  }

  res.send(resbody);
});

app.use('/alloy/assets/', express.static(path.join(__dirname, 'assets')));

app.use('/alloy/url/', function (req, res) {
  const mainurl = req.url.split('/').slice(1).join('/');
  const host = mainurl.split('/').slice(0, 3).join('/');
  const host64 = Buffer.from(host).toString('base64');
  const path = mainurl.split('/').slice(3).join('/');
  res.redirect(307, '/fetch/' + host64 + '/' + path);
});

app.use('/alloy/', function (req, res) {
  if (req.query.url) {
    var clientInput = base64Decode(req.query.url);
    if (!clientInput.startsWith('http')) clientInput = 'http://' + clientInput;
    return res.redirect(307, '/fetch/' + rewriteURL(clientInput));
  }
  return res.redirect('/');
});

app.use(function (req, res) {
  if (req.url === '/') {
    return fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
  }

  if (req.session.fetchURL) {
    return res.redirect('/fetch/' + req.session.fetchURL + req.url);
  }

  return res.send(error('404', 'No valid directory or file was found!'));
});

module.exports = app;
