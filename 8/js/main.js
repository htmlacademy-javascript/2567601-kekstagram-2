import './data';
import './formValidation';
import { picturesNode } from './photos';
import { openFullPhoto } from './renderFullPhoto';

picturesNode.addEventListener('click', (evt) => {
  const pictureElement = evt.target.closest('.picture');

  if (pictureElement) {
    openFullPhoto(pictureElement.dataset.pictureId);
  }
});
