const gameboard = document.getElementById("gameboard");
const boxes = Array.from(document.getElementsByClassName('box'));
const restartBtn = document.getElementById('restartBtn');
const playText = document.getElementById('playText');
let spaces = new Array(9).fill(null);
const O_text = "0";
const X_text = "X";
let currentPlayer = O_text;

const drawBoard = () => {
  boxes.forEach((box, index) => {
    let styleString = "";
    // top row
    if (index < 3) {
      styleString += `border-bottom: 3px solid var(--purple);`;
    }
    // left column
    if (index % 3 === 0) {
      styleString += `border-right: 3px solid var(--purple);`;
    }
    // right colum
    if (index % 3 === 2) {
      styleString += `border-left: 3px solid var(--purple);`;
    }
    // bottom row
    if (index > 5) {
      styleString += `border-top: 3px solid var(--purple);`;
    }

    box.style = styleString;
    box.addEventListener("click", boxClicked);
  });
};

function boxClicked(e) {
  const id = e.target.id;
  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;
    if (hasPlayerWon(currentPlayer)) {
      playText.innerHTML = `${currentPlayer} wins!!!`
      return;
    }
    currentPlayer = currentPlayer === O_text ? X_text : O_text;
  }
}

const hasPlayerWon = player => {
  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  WINNING_COMBINATIONS.forEach(combination => {
    const [ first, second, third ] = combination;
    if (
      spaces[first] === player &&
      spaces[second] === player &&
      spaces[third] === player
    ) {
      playText.innerText = `${player} wins!`
      boxes.forEach(box => {
        if (!box.innerText) {
          box.innerText = "-"
        }
      })
      return true
    }
  })
}

restartBtn.addEventListener("click", () => {
  spaces = new Array(9).fill(null);
  boxes.forEach(box => {
    box.innerHTML = "";
  })
  playText.innerHTML = `Let's Play!!`;

  
});

drawBoard()
