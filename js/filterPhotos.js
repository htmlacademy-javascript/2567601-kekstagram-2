import {imgPreview} from './loadPhoto';
import {setVisibilityElement} from './util';

const effectList = document.querySelector('.effects__list');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectSlider = document.querySelector('.effect-level__slider');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelNone = document.getElementById('effect-none');

let effect = '';

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 5,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const updateSliderOptions = (min, max, step) => {
  effectSlider.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    step: step,
    start: max,
  });
};

const applyFilter = (value) => {
  switch (effect) {
    case 'blur':
      imgPreview.style.filter = `${effect}(${value}px)`;
      break;
    case 'invert':
      imgPreview.style.filter = `${effect}(${value}%)`;
      break;
    default:
      imgPreview.style.filter = `${effect}(${value})`;
  }
};

export const resetFilter = () => {
  imgPreview.style.filter = 'none';
  effectLevelValue.value = '';
  setVisibilityElement(effectLevelContainer, true);
  effectLevelNone.checked = true;
};

const filterConfig = {
  'effect-chrome': () => {
    updateSliderOptions(0, 1, 0.1);
    effect = 'grayscale';
  },
  'effect-sepia': () => {
    updateSliderOptions(0, 1, 0.1);
    effect = 'sepia';
  },
  'effect-marvin': () => {
    updateSliderOptions(0, 100, 1);
    effect = 'invert';
  },
  'effect-phobos': () => {
    updateSliderOptions(0, 3, 0.1);
    effect = 'blur';
  },
  'effect-heat': () => {
    updateSliderOptions(1, 3, 0.1);
    effect = 'brightness';
  },
};

effectSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectSlider.noUiSlider.get();
  applyFilter(effectLevelValue.value);
});

effectList.addEventListener('change', (evt) => {
  if (evt.target.id !== 'effect-none') {
    setVisibilityElement(effectLevelContainer, false);

    filterConfig[evt.target.id]();
    applyFilter(effectLevelValue.value);
  } else {
    resetFilter();
  }
});
