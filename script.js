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

  const makeMark = (marker, position) => {
    board[position] = marker;
    render();
  };

  return {
    makeMark,
    render,
  };
})();

const Player = (marker = -1) => {
  const totalWins = 0;
  const getWins = () => totalWins;

  return { marker, getWins };
};

const gameMaster = (() => {
  const gameState = {
    gameStarted: false,
    gaveOver: false,
    activePlayer: null,
    players: [],
  };

  // Always need a player 1. Default marker is x.
  const player1 = Player(1);
  gameState.players.push(player1);

  return { player1 };
})();
