/* eslint-disable no-use-before-define */
/*                  
    player factory: creates player objects
    props
    .makeMark: 
    .quit


    computerPlayer: module that inherits from player factory with object.create

*/
const gameLog = (() => {
  const logText = document.querySelector(".log .text-area p");

  const messages = {
    p1Turn: "Player One's Turn!",
    p2Turn: "Player Two's Turn!",
    p1Win: "Player One Wins!",
    p2Win: "Player Two Wins!",
    tie: "It's a tie game.",
    spotTaken: "That spot is taken!",
  };

  const showMessage = (message) => {
    logText.innerHTML = messages[message];
  };

  const appendMessage = (message) => {
    const newMessage = messages[message];
    if (!logText.innerHTML.includes(newMessage)) {
      logText.innerHTML += `\n ${messages[message]}`;
    }
  };

  return {
    showMessage,
    appendMessage,
  };
})();

const gameBoard = (() => {
  const spots = document.querySelectorAll(".spot");
  const marks = document.querySelectorAll(".mark");

  const oMarker = new Image();
  const xMarker = new Image();
  oMarker.src =
    "https://drive.google.com/uc?id=12zkVtQIbnW-aF6KtEGPPKqwnRL9Cysc1";
  xMarker.src =
    "https://drive.google.com/uc?id=1peR2YWPnkPsGQw89TPYOQtTXtdSatoLa";

  const board = [-1, -1, -1, -1, -1, -1, -1, -1, -1];

  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [2, 4, 7],
    [3, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const render = () => {
    for (let i = 0; i < marks.length; i += 1) {
      if (board[i] === 1) {
        marks[i].src = xMarker.src;
      } else if (board[i] === 0) {
        marks[i].src = oMarker.src;
      } else {
        marks[i].src = "";
      }
    }
  };

  const tryMark = (position) => {
    if (!gameMaster.isStarted() && board.every((spot) => spot === -1)) {
      // Board is clear and spot is clicked
      gameMaster.startGame();
    }

    if (board[position] === -1) {
      makeMark(gameMaster.getActivePlayerMark(), position);
      gameMaster.turnOver();
    } else {
      gameLog.appendMessage("spotTaken");
    }
  };

  const checkWin = () => {
    const player1 = gameMaster.getPlayer(0);
    const player2 = gameMaster.getPlayer(1);

    // If the spots in any winning combination are all the same and not -1 then win
    WINNING_COMBINATIONS.forEach((combination) => {
      if (
        board[combination[0]] === board[combination[1]] &&
        board[combination[0]] === board[combination[2]]
      ) {
        if (board[combination[0]] === player1.attr.marker) {
          gameMaster.gameOver(player1);
        }
        if (board[combination[0]] === player2.attr.marker) {
          gameMaster.gameOver(player2);
        }
      }
    });
    // If all spots not -1 but no win then tie game
    if (board.every((spot) => spot !== -1)) {
      gameMaster.gameOver();
    }
  };

  const makeMark = (marker, position) => {
    board[position] = marker;
    render();
    checkWin();
  };

  spots.forEach((spot) => {
    spot.addEventListener("click", () =>
      tryMark(spot.getAttribute("data-pos"))
    );
  });

  return {
    render,
    tryMark,
  };
})();

const Player = (mark = -1) => {
  const attr = { marker: mark, totalWins: 0 };

  const getWins = () => attr.totalWins;

  const changeMarker = () => {
    attr.marker = attr.marker === 1 ? 0 : 1;
  };

  return { attr, getWins, changeMarker };
};

const gameMaster = (() => {
  const gameState = {
    gameStarted: false,
    gameOver: false,
    activePlayer: null,
    players: [],
  };

  const isStarted = () => gameState.gameStarted;
  const startGame = () => {
    gameState.gameStarted = true;
    setActivePlayer(0);
  };

  const getPlayer = (playerIndex) => gameState.players[playerIndex];

  const setActivePlayer = (playerIndex) => {
    gameState.activePlayer = gameState.players[playerIndex];
  };
  const getActivePlayerMark = () => gameState.activePlayer.attr.marker;

  const turnOver = () => {
    // Check for gameOver conditions
    if (gameState.activePlayer === gameState.players[0]) {
      setActivePlayer(1);
      gameLog.showMessage("p2Turn");
    } else {
      setActivePlayer(0);
      gameLog.showMessage("p1Turn");
    }
  };

  const gameOver = (player) => {
    if (player) {
      if (gameState.players.findIndex((p) => p === player) === 0) {
        gameLog.showMessage("p1Win");
      } else if (gameState.players.findIndex((p) => p === player) === 1) {
        gameLog.showMessage("p2Win");
      }
    } else {
      gameLog.showMessage("tie");
    }
    // Reset game
  };

  // Create Players
  const player1 = Player(1);
  gameState.players.push(player1);
  const player2 = Player(0);
  gameState.players.push(player2);

  return {
    isStarted,
    startGame,
    getActivePlayerMark,
    getPlayer,
    turnOver,
    gameOver,
  };
})();
