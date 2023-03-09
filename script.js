/*  Event manager: handles sub/unsub to events as well as emitting events
    .on(eventName, handler)
    .off(eventName)
    .emit(eventName)

    Events: object that stores event names for the project

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

  /*   const off = function (eventName, fn) {}; */

  return {
    on,
  };
})();

export default EventManager;