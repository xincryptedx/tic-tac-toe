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
  const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  const render = () => {};

  const makeMark = (marker, position) => {
    if (board[position] === 0) {
      board[position] = marker;
    } else {
      /* Space Taken */
    }
  };

  return {
    makeMark,
  };
})();
