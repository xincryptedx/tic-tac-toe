/*
    gameboard module: holds and changes game board data
    .makeMark(marker, position): attempts to set given marker at given position
                    
    player factory: creates player objects
    props
    .makeMark: 
    .quit


    computerPlayer: module that inherits from player factory with object.create

*/
const gameBoard = (() => {
  const boardDiv = document.querySelector(".board");
  const spots = boardDiv.children;

  const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  const render = () => {
    for (let i = 0; i < board.length; i += 1) {
      if (board[i] !== 0) {
        spots[i].innerHTML = board[i];
      }
    }
  };

  const makeMark = (marker, position) => {
    if (board[position] === 0) {
      board[position] = marker;
      render();
    } else {
      alert("Space Already Taken!"); /* Change to visual feedback later */
    }
  };

  return {
    makeMark,
    render,
    board,
  };
})();
