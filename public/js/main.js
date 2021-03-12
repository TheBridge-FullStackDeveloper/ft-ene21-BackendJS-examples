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