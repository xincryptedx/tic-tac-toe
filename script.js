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
      /*       console.log(`Position: ${i} Value: ${board[i]}`); */
      spots[i].innerHTML = board[i];
    }
  };

  const makeMark = (marker, position) => {
    if (board[position] === 0) {
      board[position] = marker;
    } else {
      /* Space Taken */
    }
  };

  return {
    makeMark,
    render,
    board,
  };
})();
