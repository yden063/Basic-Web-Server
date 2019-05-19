const http = require('http');
const fs = require('fs');

const pages = [
  {
    'path': '/',
    'associated_file': 'index.html'
  },
  {
    'path': '/about',
    'associated_file': 'about.html'
  },
  {
    'path': '/contact',
    'associated_file': 'contact.html'
  },
];

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  serveContent(req.url, (data) => {
    res.write(data);
    res.end();
  });
});

const port = process.env.PORT || 9764;
server.listen(port, () => {
  console.log(`Listening on port ${port}...`)
});

function serveContent(url, callback) {
  serveFile(url, (data) => {
    callback(data);
  });
}

function serveFile(url, callback) {
  pages.forEach(page => {
    if (page.path == url) {
      fs.readFile(`public/${page.associated_file}`, 'utf8', (err, data) => {
        callback(data);
      });
    }
  });

}