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
