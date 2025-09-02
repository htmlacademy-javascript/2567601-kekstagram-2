import { onEscKeydown } from './util';
import { resetFilter } from './filterPhotos';
import { loadPhoto } from './loadPhoto';

const uploadImgForm = document.querySelector('.img-upload__form');
const uploadImgFormElement = uploadImgForm.querySelector('.img-upload__input');
const modalForm = uploadImgForm.querySelector('.img-upload__overlay');
const pageBody = document.querySelector('body');
const imgBtnUploadCansel = uploadImgForm.querySelector('.img-upload__cancel');
const hashtagForm = uploadImgForm.querySelector('.text__hashtags');
const commentForm = uploadImgForm.querySelector('.text__description');

let pristine;
let errorMessage = '';

const toggleVisibility = () => {
  modalForm.classList.toggle('hidden');
  pageBody.classList.toggle('modal-open');
};

function onCloseModalForm () {
  uploadImgFormElement.value = '';
  hashtagForm.value = '';
  commentForm.value = '';

  imgBtnUploadCansel.removeEventListener('click', onCloseModalForm);
  document.removeEventListener('click', onDocumentEscKeydown);

  toggleVisibility();
  resetFilter();
}

function onDocumentEscKeydown (evt) {
  if (!commentForm.value && !hashtagForm.value) {
    onEscKeydown(evt, onCloseModalForm);
  }
}

const commentValidation = (value) => {
  errorMessage = '';

  const commentText = value.trim().split('');

  if(!commentText) {
    return true;
  }

  return commentText.length <= 140;
};

const hashtagValidation = (value) => {
  errorMessage = '';

  const hashtagText = value.toLowerCase().trim();

  if (!hashtagText) {
    return true;
  }

  const hashtagArrays = hashtagText.split(/\s+/);
  const uniqueHashtags = new Set(hashtagArrays);

  const validationRules = [
    { check: uniqueHashtags.size !== hashtagArrays.length, error: 'Хештеги не должны повторяться' },
    { check: hashtagArrays.some((item) => item.length > 20), error: 'Хештег не может быть больше 20 символов' },
    { check: hashtagArrays.length > 5, error: 'Нельзя указать больше 5 хештегов' },
    { check: hashtagArrays.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)), error: 'Хэштег невалиден' },
  ];

  return validationRules.every((rule) => {
    if (rule.check) {
      errorMessage = rule.error;
    }
    return !rule.check;
  });
};

const initFormValidation = () => {
  pristine = new Pristine(uploadImgForm, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
  });

  pristine.addValidator(
    hashtagForm,
    hashtagValidation,
    () => errorMessage
  );

  pristine.addValidator(
    commentForm,
    commentValidation,
    'Длина комментария должна быть не больше 140 символов'
  );
};

uploadImgFormElement.addEventListener('change',(evt) => {
  toggleVisibility();

  loadPhoto(evt);
  imgBtnUploadCansel.addEventListener('click', onCloseModalForm);
  document.addEventListener('keydown', onDocumentEscKeydown);
});

initFormValidation();
