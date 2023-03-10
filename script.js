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
  };

  const showMessage = (message) => {
    logText.innerHTML = messages[message];
  };

  return {
    showMessage,
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

    if (board[position] === -1) {
      makeMark(gameMaster.getActivePlayerMark(), position);
      gameMaster.turnOver();
    } else {
      alert("Spot taken!"); // Change this later for better feedback
    }
  };

  const makeMark = (marker, position) => {
    board[position] = marker;
    render();
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

  const setActivePlayer = (playerIndex) => {
    gameState.activePlayer = gameState.players[playerIndex];
  };
  const getActivePlayerMark = () => gameState.activePlayer.attr.marker;

  const turnOver = () => {
    // Check for gameOver conditions
    if (gameState.activePlayer === gameState.players[0]) {
      setActivePlayer(1);
    } else {
      setActivePlayer(0);
    }
  };

  // Create Players
  const player1 = Player(1);
  gameState.players.push(player1);
  const player2 = Player(0);
  gameState.players.push(player2);

  return { isStarted, startGame, getActivePlayerMark, turnOver };
})();
