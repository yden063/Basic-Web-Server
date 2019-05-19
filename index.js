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
  serveContent(req.url, (data, err) => {
    if (err)
      return res.end(err.message);

    res.write(data);
    res.end();
  });
});

const port = process.env.PORT || 9764;
server.listen(port, () => {
  console.log(`Listening on port ${port}...`)
});

function serveContent(url, callback) {
  serveFile(url, (data, err) => {
    callback(data, err);
  });
}

function serveFile(url, callback) {
  let index = 0;
  let data, err;

  for (index = 0; index < pages.length; index++) {
    const page = pages[index];

    // Check for the page exist
    if (page.path == url) {
      try {
        data = fs.readFileSync(`public/${page.associated_file}`, 'utf8')
      } catch (error) {
        // The path exist but the file doesn't exist
        err = new Error(error.message);
      }

      // Whatever the values
      // We send the callback
      return callback(data, err);
    }
  }
  // The path doesn't exist
  err = new Error(`The path: ${url} doesn't exist!`);
  return callback(null, err);
}