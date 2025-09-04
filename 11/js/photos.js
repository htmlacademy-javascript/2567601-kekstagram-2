import { fetchData } from './api';

const picturesNode = document.querySelector('.pictures');
const pictureContainerTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');

const dataErrorTemplate = document.querySelector('#data-error').content;
const pageBody = document.querySelector('body');

let photos = [];

const renderPhotos = () => {
  const photoFragment = document.createDocumentFragment();

  photos.forEach(({id, url, description, likes, comments}) => {
    const photoItem = pictureContainerTemplate.cloneNode(true);

    photoItem.dataset.pictureId = id;
    photoItem.querySelector('img').src = url;
    photoItem.querySelector('img').alt = description;
    photoItem.querySelector('.picture__comments').textContent = comments.length;
    photoItem.querySelector('.picture__likes').textContent = likes;

    photoFragment.append(photoItem);
  });

  picturesNode.append(photoFragment);
};

const renderPhotoError = () => {
  const errorFragment = document.createDocumentFragment();
  const errorItem = dataErrorTemplate.cloneNode(true); // Исправлено!
  errorFragment.append(errorItem);
  pageBody.append(errorFragment);
};

const getPhotoData = async () => {
  try {
    photos = await fetchData.get();
    renderPhotos();
  } catch (error) {
    renderPhotoError();
  }
};

getPhotoData();

export { picturesNode, photos };
