/* eslint-disable no-plusplus */
function Player(Symbol) {
  const symbol = Symbol;
  let score = 0;
  const getSymbol = () => symbol;
  const getScore = () => score;
  const win = () => score++;
  const announceWin = () => `${symbol} wins!`;
  return {
    getSymbol,
    getScore,
    win,
    announceWin,
  };
}

const Gameboard = (() => {
  const gameboard = [1, 1, 1, 1, 1, 1, 1, 1, 1];
  (function renderGameboard() {
    const gameBoard = document.getElementById("gameboard");
    for (let i = 0; i < gameboard.length; i++) {
      const square = document.createElement("div");
      square.id = `square${i}`;
      square.className = "square";
      const squareContent = document.createElement("p");
      squareContent.innerText = gameboard[i];
      square.appendChild(squareContent);
      gameBoard.appendChild(square);
    }
  })();
})();

const ScoreDisplayer = (() => {
  const displayScore = (x) => x.score;
})();
