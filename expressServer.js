// 1) ------ Importar dependencias ------
const express = require('express');
const bodyParser = require('body-parser');

// 2) ------ Configuración inicial ------
const server = express();
const listenPort = 8080;

// Folder with my frontend app
const staticFilesPath = express.static(__dirname + '/public');
server.use(staticFilesPath);

// JSON support
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// -------------- API REST --------------

server.get('/loadImage', (req, res) => {

  // JSON response
  res.send({ src: 'img/anchovieFace.jpg' });
});

const monsters = [{
  name: "a"
},
{
  name: "b"
}];

server.get('/monsters', (req, res) => {
  console.log(req.body); // {} (get no tiene body)

  res.send(JSON.stringify(monsters));
});

server.post('/monsters', (req, res) => {
  let data = req.body; // { ... } (post va con datos en body)
  
  monsters.push({ name: data.monsterName });

  res.send();
});

// ...
server.listen(listenPort,
  () => console.log(`Server started listening on ${listenPort}`)
);