# Minimal Webserver
This webserver serves files if they exist in the **/public** folder.

## What does it work ?
When you demand a path, the Werbserver is going to check if it exists. If so, it is going to distribute the associated file.

For example:

`Demanded path: /about `

`Associated file: about.html`

If the path exist but the file is not found, it is going to send a error and still keeping the server running.

If the path doesn't exist, the webserver simply send a error, and here, still keeps the server running.