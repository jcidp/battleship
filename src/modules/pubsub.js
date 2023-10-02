const events = (() => {
  const events = {};

  const on = (eventName, fn) => {
    if (!Object.prototype.hasOwnProperty.call(events, eventName))
      events[eventName] = [];
    events[eventName].push(fn);
  };

  const off = (eventName, fn) => {
    console.log(events[eventName]);
    if (!Object.prototype.hasOwnProperty.call(events, eventName)) return;
    for (let i = 0; i < events[eventName].length; i++) {
      if (events[eventName][i] === fn) {
        console.log(events[eventName]);
        events[eventName].splice(i, 1);
        console.log(events[eventName]);
        break;
      }
    }
  };

  const emit = (eventName, data) => {
    if (!Object.prototype.hasOwnProperty.call(events, eventName)) return;
    events[eventName].forEach((fn) => fn(data));
  };

  const getEvents = () => events;

  return {
    on,
    off,
    emit,
    getEvents,
  };
})();

export default events;
