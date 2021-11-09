const form = document.querySelector(".GameMode");
const radio = document.querySelectorAll('input[name="GameMode"]');
const ttt = document.querySelector(".ttt");
const start = document.querySelector(".start");
const rows = document.querySelectorAll(".row");
let winner = document.querySelector(".winner");

let current = "X";

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let selectedValue;
  for (const rv of radio) {
    if (rv.checked) {
      selectedValue = rv.value;
    }
  }
  switch (selectedValue) {
    case "PvC":
      console.log("PvC");
      hideGameMode();
      PvC();
      break;
    case "PvP":
      console.log("PvP");
      hideGameMode();
      PvP();
      break;
    default:
      console.log("error");
      break;
  }
});

function hideGameMode() {
  form.style.display = "none";
  ttt.style.display = "block";
}

function PvC() {
  for (let row of rows) {
    row.addEventListener("click", function () {
      updateScores(this);
    });
  }

  function updateScores(player) {
    if (!player.innerHTML && !winner.innerText) {
      player.innerHTML = current;
      toWin();
    }
    let checkWinner = check();

    if (checkWinner === current) {
      winner.innerText = `${current} won`;
    } else if (checkWinner === "O") {
      winner.innerText = "Computer Won";
    } else if (checkWinner === true) {
      winner.innerText = "Match Drawn";
    }
  }

  function defend() {
    console.log("Defend called");

    let flag = false;
    const pairs = ["012", "345", "678", "036", "147", "258", "048", "246"];
    for (let pair of pairs) {
      position1 = rows[pair[0]];
      position2 = rows[pair[1]];
      position3 = rows[pair[2]];
      if (position1.innerText === current && position2.innerText === current) {
        if (!position3.innerText) {
          position3.innerText = "O";
          flag = true;
        }
      } else if (
        position2.innerText === current &&
        position3.innerText === current
      ) {
        if (!position1.innerText) {
          position1.innerText = "O";
          flag = true;
        }
      } else if (
        position1.innerText === current &&
        position3.innerText === current
      ) {
        if (!position2.innerText) {
          position2.innerText = "O";
          flag = true;
        }
      }
      if (flag) {
        break;
      }
    }
    console.log(flag);
    if (!flag) {
      randomMove();
    }
  }

  function toWin() {
    console.log("To win called");
    const pairs = ["012", "345", "678", "036", "147", "258", "048", "246"];
    let flag = false;

    for (let pair of pairs) {
      position1 = rows[pair[0]];
      position2 = rows[pair[1]];
      position3 = rows[pair[2]];
      if (
        !position1.innerText &&
        position2.innerText === "O" &&
        position3.innerText === "O"
      ) {
        position1.innerText = "O";
        flag = true;
      } else if (
        !position2.innerText &&
        position1.innerText === "O" &&
        position3.innerText === "O"
      ) {
        position2.innerText = "O";
        flag = true;
      } else if (
        !position3.innerText &&
        position1.innerText === "O" &&
        position2.innerText === "O"
      ) {
        position3.innerText = "O";
        flag = true;
      }
      if (flag) {
        break;
      }
    }
    if (!flag) {
      if (!check()) {
        defend();
      }
    }
  }

  // function randomMove() {
  //     console.log("RandomMove called");

  //     for (let row of rows) {
  //         if (!row.innerText) {
  //             row.innerText = 'O';
  //             break;
  //         }
  //     }
  // }

  function randomMove() {
    console.log("RandomMove called");
    let list = [];
    for (let index = 0; index < 9; index++) {
      if (!rows[index].innerText) {
        list.push(index);
      }
    }
    let rand = Math.floor(Math.random() * list.length);
    let num = list[rand];
    rows[num].innerText = "O";
  }

  function check() {
    const pairs = ["012", "345", "678", "036", "147", "258", "048", "246"];
    for (let pair of pairs) {
      position1 = rows[pair[0]].innerText;
      position2 = rows[pair[1]].innerText;
      position3 = rows[pair[2]].innerText;
      if (
        position1 == current &&
        position2 == current &&
        position3 == current
      ) {
        return current;
      } else if (position1 == "O" && position2 == "O" && position3 == "O") {
        return "O";
      }
    }
    for (const row of rows) {
      if (!row.innerText) {
        return false;
      }
    }
    return true;
  }
}

function PvP() {
  function updateScores(player) {
    if (!player.innerHTML && !winner.innerText) {
      player.innerHTML = current;
    }
    if (check()) {
      winner.innerText = `${current} won`;
    } else current = current == "X" ? "O" : "X";
  }

  function check() {
    const pairs = ["012", "345", "678", "036", "147", "258", "048", "246"];
    for (let pair of pairs) {
      position1 = rows[pair[0]].innerText;
      position2 = rows[pair[1]].innerText;
      position3 = rows[pair[2]].innerText;
      if (
        position1 == current &&
        position2 == current &&
        position3 == current
      ) {
        return true;
      }
    }
    return false;
  }

  for (let row of rows) {
    row.addEventListener("click", function () {
      updateScores(this);
    });
  }
}
