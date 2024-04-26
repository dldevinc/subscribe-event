export default function subscribe(element, event, handler, ...options) {
  if (element.addEventListener) {
    element.addEventListener(event, handler, ...options);
    return function() {
      element.removeEventListener(event, handler, ...options);
    };
  }

  if (element.attachEvent) {
    event = "on" + event;
    element.attachEvent(event, handler);
    return function() {
      element.detachEvent(event, handler);
    };
  }

  if (element.on) {
    element.on(event, handler, ...options);
    return function() {
      element.off(event, handler, ...options);
    };
  }
}


// define your own subscribe functions
subscribe.define = function(addSubscription, removeSubscription) {
  return function(element, event, handler, ...options) {
    element[addSubscription](event, handler, ...options);
    return function() {
      element[removeSubscription](event, handler, ...options);
    };
  };
};
