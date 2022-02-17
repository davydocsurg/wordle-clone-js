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

keys.forEach((key) => {
  const buttonElement = document.createElement("button");
  buttonElement.textContent = key;
  buttonElement.setAttribute("id", key);
  buttonElement.addEventListener("click", () => handleClick(key));
  keyboard.append(buttonElement);
});
