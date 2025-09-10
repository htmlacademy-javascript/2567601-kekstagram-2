import './formValidation';
import './zoomPhoto';
import './filterPhotos';
import { picturesNode } from './photos';
import { openFullPhoto } from './renderFullPhoto';

picturesNode.addEventListener('click', (evt) => {
  const pictureElement = evt.target.closest('.picture');

  if (pictureElement) {
    openFullPhoto(pictureElement.dataset.pictureId);
  }
});
