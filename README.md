# Minimal Webserver
This Webserver serves files, whether you set them using the dynamic routing (/articles), or just by requesting for a static file (/public/index.html).

## How does it work ?
Create an instance of **WebServer**.
```javascript
const webServer = new WebServer();
```
Then if you want to use the dynamic routing system, you will have to create a path and associate a file to it: 
```javascript
webServer.addPath('/about', 'about.html');
```

When you demand a path (e.g: '/about'), the Werbserver is going to check if it exists. If so, it is going to distribute the associated file.

If the path exist but the file is not found, it is going to send a error and still keep the server running.

If the path doesn't exist (e.g: /public/index.html), the Webserver is going to check the static files. In order to be sent, the file must exist.

Finally, if the file doesn't exist, the Webserver propagate an error, and the error is displayed. 

Then you make the Webserver listening on a specific port for incoming requests using:
```javascript
webServer.start(6473);
```