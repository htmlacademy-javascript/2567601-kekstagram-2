const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const onEscKeydown = (evt, cb) => {
  if (evt.key === 'Escape') {
    cb();
  }
};

const setVisibilityElement = (element, isHidden = true) => {
  if (isHidden) {

    element.classList.add('hidden');
  } else {
    element.classList.remove('hidden');
  }
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}


export { getRandomInteger, onEscKeydown, setVisibilityElement, debounce };
