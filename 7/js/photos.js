import { createPhotos } from './data';

const picturesNode = document.querySelector('.pictures');
const pictureContainerTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');

const photos = createPhotos();

const photoFragment = document.createDocumentFragment();

photos.forEach(({ id, url, description, likes, comments }) => {
  const photoItem = pictureContainerTemplate.cloneNode(true);

  photoItem.dataset.pictureId = id;

  photoItem.querySelector('img').src = url;
  photoItem.querySelector('img').alt = description;

  photoItem.querySelector('.picture__comments').textContent = comments.length;
  photoItem.querySelector('.picture__likes').textContent = likes;

  photoFragment.append(photoItem);
});

picturesNode.append(photoFragment);

export { picturesNode, photos };

