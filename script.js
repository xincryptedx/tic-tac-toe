/* eslint-disable no-use-before-define */
/*                  
    player factory: creates player objects
    props
    .makeMark: 
    .quit


    computerPlayer: module that inherits from player factory with object.create

*/
const gameBoard = (() => {
  const marks = document.querySelectorAll(".mark");

  const oMarker = new Image();
  const xMarker = new Image();
  oMarker.src =
    "https://drive.google.com/uc?id=12zkVtQIbnW-aF6KtEGPPKqwnRL9Cysc1";
  xMarker.src =
    "https://drive.google.com/uc?id=1peR2YWPnkPsGQw89TPYOQtTXtdSatoLa";

  const board = [-1, -1, -1, -1, -1, -1, -1, -1, -1];

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
    if (!gameMaster.isStarted()) {
      gameMaster.startGame();
    }

    if (!board[position] === -1) {
      alert("Spot taken!"); // Change this later for better feedback?
    } else {
      // makeMark(gameMaster.activePlayer.marker);
    }
  };

  const makeMark = (marker, position) => {
    board[position] = marker;
    render();
  };

  return {
    makeMark,
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

  const setActivePlayer = (playerIndex) => {
    gameState.activePlayer = gameState.players[playerIndex];
  };
  const getActivePlayerMark = () => gameState.activePlayer.attr.marker;

  // Always need a player 1. Default marker is x(1).
  const player1 = Player(1);
  gameState.players.push(player1);

  return { isStarted, startGame, getActivePlayerMark, gameState };
})();
