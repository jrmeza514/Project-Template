const http = require('http');
const express = require('express');

const app = express();

app.use( express.static(__dirname) );

app.get('/', ( req, res ) => {
  res.sendFile(__dirname + "/index.html");
});

const server = http.createServer(app);
const PORT = process.env.PORT || 8080;
server.listen( PORT )
console.log(`Listening on port: ${PORT}`);
