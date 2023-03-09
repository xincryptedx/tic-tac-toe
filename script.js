/*

    gameboard module: holds and changes game board data
    .makeMark(marker, position): attempts to set given marker at given position
                    
    player factory: creates player objects
    props
    .makeMark: 
    .quit


    computerPlayer: module that inherits from player factory with object.create

*/
const EventManager = (() => {
  const events = {};

  const on = (eventName, fn) => {
    if (!events[eventName]) {
      events[eventName] = [];
    }
    events[eventName].push(fn);
  };

  const off = (eventName, fn) => {
    if (this.events[eventName]) {
      for (let i = 0; i < this.events[eventName].length; i += 1) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      }
    }
  };

  const emit = (eventName, data) => {
    if (this.events[eventName]) {
      this.events[eventName].forEach((fn) => {
        fn(data);
      });
    }
  };
  return {
    on,
    off,
    emit,
  };
})();
