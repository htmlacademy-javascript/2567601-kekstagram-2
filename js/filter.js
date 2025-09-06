import { debounce } from './util.js';
import { renderPhotos } from './photos.js';

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const imgFilters = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;
let pictures = [];

const applyPhotoFiltering = () => {
  let filteredPictures = [];

  switch (currentFilter) {
    case Filter.DEFAULT:
      filteredPictures = pictures.slice();
      break;
    case Filter.RANDOM:
      filteredPictures = pictures.slice().sort(() => 0.5 - Math.random()).slice(0, 10);
      break;
    case Filter.DISCUSSED:
      filteredPictures = pictures.slice().sort((a, b) => b.comments.length - a.comments.length);
      break;
  }

  const picturesNode = document.querySelector('.pictures');
  picturesNode.querySelectorAll('.picture').forEach((picture) => picture.remove());

  debounce(() => {
    renderPhotos(filteredPictures);
  }, 500)();
};

const onFilterClick = (evt) => {
  const targetButton = evt.target;

  if (!targetButton.matches('button') || targetButton.id === currentFilter) {
    return;
  }

  const activeButton = document.querySelector('.img-filters__button--active');
  activeButton.classList.remove('img-filters__button--active');

  targetButton.classList.add('img-filters__button--active');
  currentFilter = targetButton.id;

  applyPhotoFiltering();
};

const renderByFilter = (picturesData)=> {
  imgFilters.classList.remove('img-filters--inactive');
  imgFilters.addEventListener('click', onFilterClick);
  pictures = picturesData;
};

export { renderByFilter };
