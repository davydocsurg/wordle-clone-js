import "./style.css";
let wordle;
// import "bootstrap/dist/css/bootstrap.css";

document.querySelector("#app").innerHTML = `
<div class="game-container">
<div class="title-container">
  <h1>Wordle</h1>
</div>

<div class="message-container"></div>
<div class="tile-container"></div>
<div class="key-container"></div>
</div>
`;

const tileDisplay = document.querySelector(".tile-container");
const keyboard = document.querySelector(".key-container");
const msgDisplay = document.querySelector(".message-container");

const getWordle = () => {
  fetch("http://localhost:8000/word")
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      let wordle = json.toUpperCase();
    })
    .catch((err) => {
      console.error(err);
    });
};

getWordle();

const keys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "«",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "ENTER",
];

const guessRows = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

guessRows.forEach((guessRow, guessRowIndex) => {
  const rowElement = document.createElement("div");
  rowElement.setAttribute("id", "guessRow-" + guessRowIndex);
  guessRow.forEach((_guess, guessIndex) => {
    const tileElement = document.createElement("div");
    tileElement.setAttribute(
      "id",
      "guessRow-" + guessRowIndex + "-tile-" + guessIndex
    );
    tileElement.classList.add("tile");
    rowElement.append(tileElement);
  });
  tileDisplay.append(rowElement);
});

const handleClick = (key) => {
  console.log("clicked", key);
  if (!isGameOver) {
    if (key === "«") {
      deleteLetter();
      // console.log("guessRows", guessRows);
      return;
    }

    if (key === "ENTER") {
      checkRow();
      return;
    }
    addLetter(key);
  }
};

const addLetter = (letter) => {
  if (currentRow < 6 && currentTile < 5) {
    const tile = document.getElementById(
      "guessRow-" + currentRow + "-tile-" + currentTile
    );
    tile.textContent = letter;
    guessRows[currentRow][currentTile] = letter;
    tile.setAttribute("data", letter);
    currentTile++;
    console.log("guessRows", guessRows);
  }
};

keys.forEach((key) => {
  const buttonElement = document.createElement("button");
  buttonElement.textContent = key;
  buttonElement.setAttribute("id", key);
  buttonElement.addEventListener("click", () => handleClick(key));
  keyboard.append(buttonElement);
});

const deleteLetter = () => {
  if (currentTile > 0) {
    currentTile--;
    const tile = document.getElementById(
      "guessRow-" + currentRow + "-tile-" + currentTile
    );
    tile.textContent = "";
    guessRows[currentRow][currentTile] = "";
    tile.setAttribute("data", "");
  }
};

const checkRow = () => {
  const guess = guessRows[currentRow].join("");
  console.log(guess);

  if (currentTile > 4) {
    fetch(`http://localhost:8000/check/?word=${guess}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });

    console.log("guess == " + guess, "wordle ==" + wordle);
    flipTile();
    if (wordle == guess) {
      isGameOver = true;
      displayMsg("Superb!");
      return;
    }
  } else {
    if (currentRow >= 5) {
      isGameOver = true;
      displayMsg("Game Over!");
      return;
    }

    if (currentRow < 5) {
      currentRow++;
      currentTile = 0;
    }
  }
};

const displayMsg = (msg) => {
  const msgElement = document.createElement("p");
  msgElement.style.padding = "10px";
  msgElement.style.zIndex = "2";
  msgElement.textContent = msg;
  msgDisplay.append(msgElement);
  // hide message after 2s
  setTimeout(() => {
    msgDisplay.removeChild(msgElement);
  }, 2000);
};

const addColorToKey = (keyLetter, color) => {
  const key = document.getElementById(keyLetter);
  key.classList.add(color);
};

const flipTile = () => {
  const rowTiles = document.querySelector("#guessRow-" + currentRow).childNodes;
  // let checkWordle = wordle;
  const guess = [];

  rowTiles.forEach((tile, i) => {
    guess.push({
      letter: tile.getAttribute("data"),
      color: "grey-overlay",
    });
  });

  guess.forEach((guess, i) => {
    if (guess.letter == wordle[i]) {
      guess.color = "green-overlay";
      checkWordle = checkWordle.replace(guess.letter, "");
    }
  });

  guess.forEach((guess) => {
    if (checkWordle.includes(guess.letter)) {
      guess.color = "yellow-overlay";
      checkWordle = checkWordle.replace(guess.letter, "");
    }
  });

  rowTiles.forEach((tile, i) => {
    const dataLetter = tile.getAttribute("data");

    setTimeout(() => {
      tile.classList.add("flip");
      tile.classList.add(guess[i].color);
      addColorToKey(guess[i].letter, guess[i].color);

      // if (dataLetter == wordle[i]) {
      //   tile.classList.add("green-overlay");
      //   addColorToKey(dataLetter, "green-overlay");
      // } else if (wordle.includes(dataLetter)) {
      //   tile.classList.add("yellow-overlay");
      //   addColorToKey(dataLetter, "yellow-overlay");
      // } else {
      //   tile.classList.add("grey-overlay");
      //   addColorToKey(dataLetter, "grey-overlay");
      // }
    }, 500 * i);
  });
};
