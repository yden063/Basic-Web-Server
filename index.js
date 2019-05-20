const http = require('http');
const fs = require('fs');

class WebServer {
  constructor() {
    this.pages = new Array();
  }

  start(port) {
    http.createServer((req, res) => {
      this.serveFile(req.url, (data, err) => {
        if (err) {
          console.log('error ' + err);
          res.end(err.message);
          return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
      });
    }).listen(port, () => {
      console.log(`Webserver started at http://localhost:${port}`);
    });
  }

  addPath(path, file) {
    this.pages.push(
      {
        'path': path,
        'associated_file': file
      }
    );
  }

  serveFile(url, callback) {
    let index = 0;
    let data, err;
    let found = false;

    for (index = 0; index < this.pages.length; index++) {
      const page = this.pages[index];

      // Check for the page exist
      if (page.path == url) {
        try {
          data = fs.readFileSync(`public/${page.associated_file}`, 'utf8');
        } catch (error) {
          // The path exist but the file doesn't exist
          err = new Error(error.message);
        }

        // Whatever the values
        // We send the callback
        return callback(data, err);
      }
    }

    // Looking for static files
    try {
      const filename = url.split('/')[1];
      data = fs.readFileSync(filename, 'utf8');
      return callback(data, null);
    } catch (error) {
      // The path and static file don't exist at all
      err = new Error(`The path: ${url} doesn't exist!`);
    }

    return callback('null', err);
  }
}

const webServer = new WebServer();
webServer.addPath('/', 'index.html');
webServer.addPath('/about', 'about.html');
webServer.addPath('/articles', 'articles.html');

webServer.start(6743);

