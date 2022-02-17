import "./style.css";

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

const word = "SUPER";

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
  if ((key = "«")) {
    console.log("delete letter");
  }

  if ((key = "ENTER")) {
    console.log("check row");
  }
  addLetter(key);
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

  // console.log("guessRow", this);
};

keys.forEach((key) => {
  const buttonElement = document.createElement("button");
  buttonElement.textContent = key;
  buttonElement.setAttribute("id", key);
  buttonElement.addEventListener("click", () => handleClick(key));
  keyboard.append(buttonElement);
});
