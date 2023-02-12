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
  const gameboard = new Array(9);
  function renderGameboard() {
    const gameBoard = document.getElementById("gameboard");
    for (let i = 0; i < gameboard.length; i++) {
      const square = document.createElement("div");
      square.id = `square${i}`;
      square.className = "square";
      const squareContent = document.createElement("p");
      squareContent.innerText = `${gameboard[i] ? gameboard[i] : ""}`;
      square.appendChild(squareContent);
      gameBoard.appendChild(square);
    }
  }
  renderGameboard();
  function clearGameboard() {
    const gameBoard = document.getElementById("gameboard");
    while (gameBoard.lastChild) {
      gameBoard.removeChild(gameBoard.lastChild);
    }
  }
  const mark = (x, y) => {
    gameboard[x] = y;
    clearGameboard();
    renderGameboard();
  };

  const checkGame = () => {
    if (gameboard[0] && gameboard[1] && gameboard[2]) {
      if (gameboard[0] === gameboard[1] && gameboard[0] === gameboard[2]) {
        return true;
      }
      return false;
    }
    if (gameboard[3] && gameboard[4] && gameboard[5]) {
      if (gameboard[3] === gameboard[4] && gameboard[3] === gameboard[5]) {
        return true;
      }
      return false;
    }
    if (gameboard[6] && gameboard[7] && gameboard[8]) {
      if (gameboard[6] === gameboard[7] && gameboard[6] === gameboard[8]) {
        return true;
      }
      return false;
    }
    if (gameboard[0] && gameboard[3] && gameboard[6]) {
      if (gameboard[0] === gameboard[3] && gameboard[0] === gameboard[6]) {
        return true;
      }
      return false;
    }
    if (gameboard[1] && gameboard[4] && gameboard[7]) {
      if (gameboard[1] === gameboard[4] && gameboard[1] === gameboard[7]) {
        return true;
      }
      return false;
    }
    if (gameboard[2] && gameboard[5] && gameboard[8]) {
      if (gameboard[2] === gameboard[5] && gameboard[2] === gameboard[8]) {
        return true;
      }
      return false;
    }
    if (gameboard[0] && gameboard[4] && gameboard[8]) {
      if (gameboard[0] === gameboard[4] && gameboard[0] === gameboard[8]) {
        return true;
      }
      return false;
    }
    if (gameboard[2] && gameboard[4] && gameboard[6]) {
      if (gameboard[2] === gameboard[4] && gameboard[2] === gameboard[6]) {
        return true;
      }
      return false;
    }
  };
  return { mark, checkGame };
})();
