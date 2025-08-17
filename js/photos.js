import { createPhotos } from './data';

const pictureContainerTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');

const photos = createPhotos();

const photoFragment = document.createDocumentFragment();

photos.forEach(({ url, description, likes, comments }) => {
  const photoItem = pictureContainerTemplate.cloneNode(true);

  photoItem.querySelector('img').src = url;
  photoItem.querySelector('img').alt = description;

  photoItem.querySelector('.picture__comments').textContent = comments.map((comment) => comment.message);
  photoItem.querySelector('.picture__likes').textContent = likes;

  photoFragment.append(photoItem);
});

