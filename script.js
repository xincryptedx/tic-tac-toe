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
  const marks = boardDiv.querySelectorAll(".mark");

  const board = [-1, -1, -1, -1, -1, -1, -1, -1, -1];

  const render = (position, shouldAnimate = false) => {};

  const makeMark = (marker, position) => {};

  return {
    makeMark,
    render,
    marks,
  };
})();
