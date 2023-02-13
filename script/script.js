/* eslint-disable no-loop-func */
/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
function Player(Symbol) {
  const _symbol = Symbol;
  let _score = 0;
  const getSymbol = () => _symbol;
  const getScore = () => _score;
  const win = () => _score++;
  const resetScore = () => {
    _score = 0;
    return _score;
  };
  return {
    getSymbol,
    getScore,
    win,
    resetScore,
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
      const squareContent = document.createElement("img");
      squareContent.setAttribute("src", `${gameboard[i] ? gameboard[i] : ""}`);
      squareContent.className = "symbol-on-board";
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

  function emptyBoard() {
    for (let i = 0; i < gameboard.length; i++) {
      delete gameboard[i];
    }
    clearGameboard();
    renderGameboard();
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
  return { mark, clearGameboard, emptyBoard, checkGame };
})();

const Game = (() => {
  const startButton = document.getElementById("start-game");
  const restartButton = document.getElementById("restart-game");
  const player1 = Player("./assets/icons/close (1).svg");
  const player2 = Player("./assets/icons/circle-outline.svg");
  let activePlayer = player1;

  startButton.addEventListener("click", () => {
    clickGrid();
    scoreDisplayer.updateScore();
  });

  restartButton.addEventListener("click", restartGame);

  function clickGrid() {
    const squares = document.getElementsByClassName("square");
    for (const square of squares) {
      square.addEventListener("click", () => {
        Gameboard.mark(
          Number(square.id.match(/\d+/)),
          activePlayer.getSymbol()
        );
        if (Gameboard.checkGame()) {
          if (activePlayer === player1) {
            player1.win();
          } else {
            player2.win();
          }
          scoreDisplayer.clearScore();
          scoreDisplayer.updateScore();
          Gameboard.emptyBoard();
          changeActivePlayer();
        }
        clickGrid();
        changeActivePlayer();
      });
    }
  }

  function changeActivePlayer() {
    if (activePlayer === player1) {
      activePlayer = player2;
    } else {
      activePlayer = player1;
    }
  }

  function restartGame() {
    player1.resetScore();
    player2.resetScore();
    scoreDisplayer.clearScore();
    scoreDisplayer.updateScore();
    Gameboard.emptyBoard();
    activePlayer = player1;
    clickGrid();
  }

  const getPlayer1Symbol = () => player1.getSymbol();
  const getPlayer2Symbol = () => player2.getSymbol();
  const getPlayer1Score = () => player1.getScore();
  const getPlayer2Score = () => player2.getScore();

  return {
    getPlayer1Score,
    getPlayer2Score,
    getPlayer1Symbol,
    getPlayer2Symbol,
  };
})();

const scoreDisplayer = (() => {
  function updateScore() {
    const scoreBoard = document.getElementById("score-displayer");

    const player1Div = document.createElement("div");
    player1Div.id = "player1-score";
    player1Div.className = "scores";

    const player1Symbol = document.createElement("img");
    player1Symbol.className = "symbol-on-score";
    player1Symbol.setAttribute("src", `${Game.getPlayer1Symbol()}`);

    const player1Score = document.createElement("p");
    player1Score.innerText = `${Game.getPlayer1Score()}`;

    player1Div.appendChild(player1Symbol);
    player1Div.appendChild(player1Score);

    const player2Div = document.createElement("div");
    player2Div.id = "player2-score";
    player2Div.className = "scores";

    const player2Symbol = document.createElement("img");
    player2Symbol.className = "symbol-on-score";
    player2Symbol.setAttribute("src", `${Game.getPlayer2Symbol()}`);

    const player2Score = document.createElement("p");
    player2Score.innerText = `${Game.getPlayer2Score()}`;

    player2Div.appendChild(player2Symbol);
    player2Div.appendChild(player2Score);

    scoreBoard.appendChild(player1Div);
    scoreBoard.appendChild(player2Div);
  }

  function clearScore() {
    const scoreBoard = document.getElementById("score-displayer");
    while (scoreBoard.lastChild) {
      scoreBoard.removeChild(scoreBoard.lastChild);
    }
  }

  return { updateScore, clearScore };
})();
