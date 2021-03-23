// 1) ------ Importar dependencias ------
const express = require('express');
const firebase = require('firebase');

require('dotenv').config();

// 2) ------ Configuración inicial ------
const server = express();
const listenPort = process.argv[2] || process.env.PORT || 8080;

const firebaseConfig = {
  apiKey: "AIzaSyDxDds9V5X4dW-JkTyUMclnZObEPP4313Y",
  authDomain: "urban-monsters.firebaseapp.com",
  databaseURL: "https://urban-monsters-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "urban-monsters",
  storageBucket: "urban-monsters.appspot.com",
  messagingSenderId: "316615256952",
  appId: "1:316615256952:web:7b3cc829cad09b9958f68d",
};

let last = 0;

// Folder with my frontend app
const staticFilesPath = express.static(__dirname + '/public');
server.use(staticFilesPath);

// JSON support
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// -------------- API REST --------------

server.get('/loadImage', (req, res) => {

  // JSON response
  res.send({ src: 'img/anchovieFace.jpg' });
});

// GET MONSTER
server.get('/monsters', (req, res) => {
  console.log(req.body); // {} (get no tiene body)
  
  firebase.database().ref('monsters/').once('value')
    .then(data => {
      const responseData = {
        id: 0, // TODO: Or whatever,
        monsters: data.val()
      };

      res.send(JSON.stringify(responseData));
    })
    .catch(error => {
      res.send(JSON.stringify({ msgError: "No hay datos" }));
    });
});

// POST MONSTER (w/ promises)
server.post('/monsters', (req, res) => {
  
  firebase.database().ref('monsters/' + last).update({
    name: req.body.name
  })
  .then(data => {
    res.send(JSON.stringify({ result: "Ok" }))
    last++;
  })
  .catch(error => {
    res.send(JSON.stringify({ msgError: "No se puede escribir" }));
  });
});

// PUT MONSTER (w/ async/await)
server.put('/monsters', async (req, res) => {
  let body = req.body;
  let params = req.query; // Query strings example

  // Cambiar el nombre de aquel elemento referenciado por el myId
  // ... Validations ...
  await firebase.database().ref('monsters/' + params.myId).update({
    name: body.name
  })

  res.send("Todo bien");
});

// DELETE MONSTER (w/ async/await)
server.delete('/monsters/:myId', async (req, res) => {
  let params = req.params; // Query params example
  
  // Borrrar aquel elemento referenciado por el myId
  // ... Validations ...
  await firebase.database().ref('monsters/' + params.myId).remove()

  res.send("Todo bien");
});

async function init() {
  await firebase.initializeApp(firebaseConfig);

  server.listen(listenPort,
    () => console.log(`Server started listening on ${listenPort}`)
  );
}

init();
