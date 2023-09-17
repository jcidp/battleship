const events = (() => {
  const events = {};

  const on = (eventName, fn) => {
    if (!Object.prototype.hasOwnProperty.call(events, eventName))
      events[eventName] = [];
    events[eventName].push(fn);
  };

  const off = (eventName, fn) => {
    if (!Object.prototype.hasOwnProperty.call(events, eventName)) return;
    for (let i = 0; i < events[eventName].length; i++) {
      if (events[eventName][i] === fn) {
        events[eventName].splice(i, 1);
        break;
      }
    }
  };

  const emit = (eventName, data) => {
    if (!Object.prototype.hasOwnProperty.call(events, eventName)) return;
    events[eventName].forEach((fn) => fn[data]);
  };

  return {
    on,
    off,
    emit,
  };
})();

export default events;
