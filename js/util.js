
const TIME_IN_SHOW_ALERT = 3000;
const TIME_IN_DEBOUNCE = 500;
const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.style.position = 'absolute';
  alert.style.zIndex = '1000';
  alert.style.left = '0';
  alert.style.right = '0';
  alert.style.top = '10px';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '30px';
  alert.style.textAlign = 'center';
  alert.style.backgroundColor = 'red';
  alert.style.borderRadius = '10%';
  alert.textContent = message;
  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, TIME_IN_SHOW_ALERT);
};

// Источник - https://www.freecodecamp.org/news/javascript-debounce-example
const debounce = (callback, timeoutDelay = TIME_IN_DEBOUNCE) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {showAlert,debounce};
