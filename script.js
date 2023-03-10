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

  const markVideo = document.createElement("video");
  markVideo.src =
    "https://drive.google.com/uc?id=1tZ9VppmxwWYUEgaqNbY9v-a8tffZmXuJ";

  marks.forEach((video) => {
    const newVid = video;
    newVid.src = markVideo.src;
  });

  const board = [-1, -1, -1, -1, -1, -1, -1, -1, -1];

  const render = (position, shouldAnimate = false) => {
    if (shouldAnimate) {
    } else {
      for (let i = 0; i < marks.length; i += 1) {
        if (board[i] === -1) {
          marks[i].pause();
          marks[i].currentTime = 1;
        }
        // If 0  set image frame x
        // If 1 set image frame y
      }
    }
  };

  const makeMark = (marker, position) => {};

  return {
    makeMark,
    render,
    marks,
  };
})();
