const http = require("http");
const fs = require("fs");

const host = "localhost";
const port = 8080;

const server = http.createServer((request, response) => {

  // Business logic & endpoints
  
  // Home
  if (request.url === "/") {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write('<h1>Welcome to my home</h1>');
    response.end();
  }
  else // Halloween
  if (request.url === "/hw") {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write('<h2>Happy Halloween!!!!!</h2>');
    response.end();
  }
  else // HTML File
  if (request.url === "/file") {
    fs.readFile('front/fichero.html', (error, data) => {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(data);
      response.end();
    });
  }
  else // CSS File
  if (request.url === "/css") {
    fs.readFile('front/css/style.css', (error, data) => {
      response.writeHead(200, { 'Content-Type': 'text/css' });
      response.write(data);
      response.end();
    });
  }
  else // JSON File
  if (request.url === "/jsondata") {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify({ nombre: "Soy un fichero HTML" }));
    response.end();
  }
  else { // 404
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.write('No hay de eso');
    response.end();
  }
});

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
