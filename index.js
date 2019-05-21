const WebServer = require('./WebServer.js');

const webServer = new WebServer();
webServer.addPath('/', 'index.html');
webServer.addPath('/about', 'about.html');
webServer.addPath('/articles', 'articles.html'); // error saying file 'articles.html' not found

webServer.start(6743);

