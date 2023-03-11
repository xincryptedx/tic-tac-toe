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
    continue: "Tap board to start new game.",
  };

  const displayMessage = (message) => {
    logText.innerHTML = messages[message];
  };

  const appendMessage = (message) => {
    const newMessage = messages[message];
    if (!logText.innerHTML.includes(newMessage)) {
      logText.innerHTML += `\n ${messages[message]}`;
    }
  };

  const hide = () => {
    logText.classList.add("hidden");
  };

  const show = () => {
    logText.classList.remove("hidden");
  };

  return {
    displayMessage,
    appendMessage,
    hide,
    show,
  };
})();

const gameBoard = (() => {
  const spots = document.querySelectorAll(".spot");
  const marks = document.querySelectorAll(".mark");

  const oMarker = new Image();
  const xMarker = new Image();
  let loadedImageTotal = 0;
  let imagesLoaded = false;

  oMarker.addEventListener("load", () => checkLoadedImages());
  xMarker.addEventListener("load", () => checkLoadedImages());

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
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkLoadedImages = () => {
    loadedImageTotal += 1;
    if (loadedImageTotal > 1) {
      imagesLoaded = true;
      gameLog.displayMessage("p1Turn");
    }
  };

  window.onload = (() => {
    if (oMarker.complete && xMarker.complete) {
      imagesLoaded = true;
      gameLog.displayMessage("p1Turn");
    }
  })();

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
    if (imagesLoaded) {
      if (gameMaster.isGameOver()) {
        render();
        labelController.setActive(0);
        gameLog.displayMessage("p1Turn");
        gameMaster.startGame();
        return;
      }

      if (!gameMaster.isStarted() && board.every((spot) => spot === -1)) {
        // Board is clear and spot is clicked
        gameMaster.startGame();
      }

      if (board[position] === -1) {
        makeMark(gameMaster.getActivePlayerMark(), position);
      } else {
        gameLog.appendMessage("spotTaken");
      }
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
    gameMaster.turnOver();
  };

  const makeMark = (marker, position) => {
    board[position] = marker;
    render();
    checkWin();
  };

  const clearBoard = () => {
    for (let i = 0; i < board.length; i += 1) {
      board[i] = -1;
    }
  };

  spots.forEach((spot) => {
    spot.addEventListener("click", () => {
      tryMark(spot.getAttribute("data-pos"));
    });
  });

  return {
    render,
    tryMark,
    clearBoard,
  };
})();

const Player = (mark = -1) => {
  const attr = { name: "", aiControlled: false, marker: mark, totalWins: 0 };

  const getWins = () => attr.totalWins;

  const getName = () => attr.name;

  const changeMarker = () => {
    attr.marker = attr.marker === 1 ? 0 : 1;
  };

  return { attr, getWins, getName, changeMarker };
};

const gameMaster = (() => {
  const gameState = {
    gameStarted: false,
    gameOver: false,
    activePlayer: null,
    players: [],
  };

  const isGameOver = () => gameState.gameOver;

  const isStarted = () => gameState.gameStarted;
  const startGame = () => {
    gameState.gameStarted = true;
    gameState.gameOver = false;
    setActivePlayer(0);
  };

  const getPlayer = (playerIndex) => gameState.players[playerIndex];

  const setActivePlayer = (playerIndex) => {
    gameState.activePlayer = gameState.players[playerIndex];
  };
  const getActivePlayerMark = () => gameState.activePlayer.attr.marker;

  const turnOver = () => {
    // Check for gameOver conditions
    if (!gameState.gameStarted) return;
    if (gameState.activePlayer === gameState.players[0]) {
      setActivePlayer(1);
      gameLog.displayMessage("p2Turn");
      labelController.setActive(1);
    } else {
      setActivePlayer(0);
      gameLog.displayMessage("p1Turn");
      labelController.setActive(0);
    }
  };

  const gameOver = (player) => {
    gameState.gameStarted = false;
    gameState.gameOver = true;
    if (player) {
      if (gameState.players.findIndex((p) => p === player) === 0) {
        gameLog.displayMessage("p1Win");
        gameState.players[0].attr.totalWins += 1;
      } else if (gameState.players.findIndex((p) => p === player) === 1) {
        gameLog.displayMessage("p2Win");
        gameState.players[1].attr.totalWins += 1;
      }
    } else {
      gameLog.displayMessage("tie");
    }
    resetGame();
  };

  const resetGame = () => {
    gameBoard.clearBoard();
    gameLog.appendMessage("continue");
    labelController.updateWins();
  };

  const getWins = (playerIndex) => {
    if (gameState.players[playerIndex]) {
      return gameState.players[playerIndex].getWins();
    }
    return undefined;
  };

  const getName = (playerIndex) => {
    if (gameState.players[playerIndex]) {
      return gameState.players[playerIndex].getName();
    }
    return undefined;
  };

  const setName = (playerIndex, newName) => {
    if (gameState.players[playerIndex]) {
      gameState.players[playerIndex].attr.name = newName;
    }
  };

  // Create Players
  const player1 = Player(1);
  gameState.players.push(player1);
  const player2 = Player(0);
  gameState.players.push(player2);

  return {
    isStarted,
    isGameOver,
    startGame,
    getActivePlayerMark,
    getName,
    setName,
    getPlayer,
    getWins,
    turnOver,
    gameOver,
  };
})();

const labelController = (() => {
  const playerOptions = document.querySelector(".player-change");
  const playerNameInput = playerOptions.querySelector("input.player-name");
  const playerTypeBtn = playerOptions.querySelector(".player-type");
  const playerOneLabel = document.querySelector(".player-info .player-one");
  const playerTwoLabel = document.querySelector(".player-info .player-two");
  const playerOneName = playerOneLabel.children[0];
  const playerTwoName = playerTwoLabel.children[0];
  const playerOneWins = document.querySelector(
    ".player-info .player-one .wins span"
  );
  const playerTwoWins = document.querySelector(
    ".player-info .player-two .wins span"
  );

  const setActive = (playerIndex) => {
    if (playerIndex === 0) {
      playerOneLabel.classList.add("is-active");
      playerTwoLabel.classList.remove("is-active");
    }
    if (playerIndex === 1) {
      playerTwoLabel.classList.add("is-active");
      playerOneLabel.classList.remove("is-active");
    }
  };

  const updatePlayerName = () => {
    let playerIndex;
    if (playerOptions.classList.contains("player-one")) playerIndex = 0;
    if (playerOptions.classList.contains("player-two")) playerIndex = 1;
    const newName = playerNameInput.value;
    gameMaster.setName(playerIndex, newName);
    populateOptions(playerIndex);
  };

  const updateWins = () => {
    playerOneWins.innerHTML = gameMaster.getWins(0);
    playerTwoWins.innerHTML = gameMaster.getWins(1);
  };

  const hideOptions = () => {
    playerOptions.classList.add("hidden");
  };

  const showOptions = () => {
    playerOptions.classList.remove("hidden");
  };

  const populateOptions = (playerIndex) => {
    const pName = gameMaster.getName(playerIndex);
    if (!pName && playerIndex === 0) playerNameInput.placeholder = "Player One";
    else if (!pName && playerIndex === 1)
      playerNameInput.placeholder = "Player Two";
    playerNameInput.value = pName;
  };

  const changePlayerOptions = (playerIndex) => {
    const thisPlayerClass = playerIndex === 0 ? "player-one" : "player-two";
    const otherPlayerClass = playerIndex === 0 ? "player-two" : "player-one";
    if (
      !playerOptions.classList.contains("hidden") &&
      playerOptions.classList.contains(otherPlayerClass)
    ) {
      playerOptions.classList.remove(otherPlayerClass);
      playerOptions.classList.add(thisPlayerClass);
      populateOptions(playerIndex);
    } else if (
      !playerOptions.classList.contains("hidden") &&
      playerOptions.classList.contains(thisPlayerClass)
    ) {
      gameLog.show();
      hideOptions();
      playerOptions.classList.remove(thisPlayerClass);
    } else if (playerOptions.classList.contains("hidden")) {
      gameLog.hide();
      showOptions();
      playerOptions.classList.add(thisPlayerClass);
      populateOptions(playerIndex);
    }
  };

  playerOneLabel.addEventListener("click", () => changePlayerOptions(0));
  playerTwoLabel.addEventListener("click", () => changePlayerOptions(1));
  playerNameInput.addEventListener("input", () => updatePlayerName());

  return { setActive, updateWins, changePlayerOptions, updatePlayerName };
})();
