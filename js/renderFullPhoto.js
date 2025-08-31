import {cleanupComments, initComments, renderComments, renderLimitedComments} from './renderComments';
import { onEscKeydown } from './util';

import { photos } from './photos';

const fullPhotoContainer = document.querySelector('.big-picture');
const fullPhotoImg = fullPhotoContainer.querySelector('.big-picture__img').querySelector('img');
const fullPhotoLikes = fullPhotoContainer.querySelector('.likes-count');
const fullPhotoCountComments = fullPhotoContainer.querySelector('.social__comment-shown-count');
const fullPhotoDescription = fullPhotoContainer.querySelector('.social__caption');
const fullPhotoCancel = fullPhotoContainer.querySelector('.big-picture__cancel');

function onFullPhotoCancelClick() {
  closeFullPhoto();
}

const onDocumentEscKeydown = (evt) => {
  onEscKeydown(evt, closeFullPhoto);
};

function closeFullPhoto() {
  fullPhotoContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEscKeydown);
  cleanupComments();
}

export const openFullPhoto = (photoId) => {
  const currentPhoto = photos.find((photo) => photo.id === Number(photoId));

  fullPhotoImg.src = currentPhoto.url;
  fullPhotoImg.alt = currentPhoto.description;

  fullPhotoLikes.textContent = currentPhoto.likes;
  fullPhotoCountComments.textContent = currentPhoto.comments.length;

  fullPhotoDescription.textContent = currentPhoto.description;

  initComments(currentPhoto.comments);

  fullPhotoContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  fullPhotoCancel.addEventListener('click', onFullPhotoCancelClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
};
