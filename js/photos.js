import { fetchData } from './api';

const picturesNode = document.querySelector('.pictures');
const pictureContainerTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
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
  const errorItem = dataErrorTemplate.cloneNode(true);
  pageBody.append(errorItem);
  return errorItem;
};

const closePhotoError = (errorItem) => {
  errorItem.remove();
};

const getPhotoData = async () => {
  try {
    photos = await fetchData.get();
    renderPhotos();
  } catch (error) {
    const errorItem = renderPhotoError();
    setTimeout(() => closePhotoError(errorItem), 5000);
  }
};

getPhotoData();

export { picturesNode, photos };
