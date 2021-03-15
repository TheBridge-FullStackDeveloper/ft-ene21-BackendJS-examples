document
  .querySelector("#monsterMasterBtn")
  .addEventListener("click", () => {
    fetch("/monsters")
      .then(response => response.json())
      .then(data => {
        data.map(monster => {
          document
            .querySelector("#monsterMaster")
            .innerHTML += monster.name + "<br />"
      })
    })
  });

document
  .querySelector("#imageBtn")
  .addEventListener("click", () => {
    fetch("/loadImage")
      .then(response => response.json())
      .then(data => {
        document
          .querySelector("#theImage")
          .src = data.src
      })
  });

// ----------------- CRUD Operations -----------------

let myId;

// GET MONSTER
document
  .querySelector("#monsterMasterBtn")
  .addEventListener("click", () => {
    fetch("/monsters")
      .then(response => response.json())
      .then(data => {
        if( data.msgError !== undefined ) {
          // Pinto el error al usuario
          // ...
        }
        else {
          //myId = data.id...
          
          data.map(monster => {
            // Pintar el maestro de monstruos
            // ...
          })
        }
      })
  });

// POST MONSTER
document
  .querySelector("#submitBtn")
  .addEventListener("click", () => {

    const user = {
      name: document.querySelector("#monsterName").value
    };

    const options = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch("/monsters", options)
      .then(response => response.json())
      .then(data => {
        console.log(data.result);
      })
  });

// PUT MONSTER
document
  .querySelector("#submitUpdateBtn")
  .addEventListener("click", () => {

    const user = {
      name: document.querySelector("#monsterName").value
    };

    const options = {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch("/monsters?myId=" + myId, options)
      .then(response => response.json())
      .then(data => {
        console.log(data.result);
      })
  });

// DELETE MONSTER
document
  .querySelector("#submitDeleteBtn")
  .addEventListener("click", () => {
    fetch("/monsters/" + myId, { method: 'DELETE' })
      .then(response => response.json())
      .then(data => {
        console.log(data.result);
      })
  });