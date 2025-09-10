import { onEscKeydown } from './util';
import { resetFilter } from './filterPhotos';
import { loadPhoto } from './loadPhoto';
import { photoData } from './api';
import { resetZoomPhoto } from './zoomPhoto';

const uploadImgForm = document.querySelector('.img-upload__form');
const uploadImgFormElement = uploadImgForm.querySelector('.img-upload__input');
const modalForm = uploadImgForm.querySelector('.img-upload__overlay');
const pageBody = document.querySelector('body');
const imgBtnUploadCansel = uploadImgForm.querySelector('.img-upload__cancel');
const imgBtnUploadSubmit = uploadImgForm.querySelector('.img-upload__submit');
const hashtagForm = uploadImgForm.querySelector('.text__hashtags');
const commentForm = uploadImgForm.querySelector('.text__description');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

let pristine;
let errorMessage = '';
let currentMessageElement = null;

const toggleVisibility = () => {
  modalForm.classList.toggle('hidden');
  pageBody.classList.toggle('modal-open');
  const picturesNode = document.querySelector('.pictures');
  if (picturesNode && picturesNode.classList.contains('hidden')) {
    picturesNode.classList.remove('hidden');
  }
};

function onCloseModalForm() {
  uploadImgFormElement.value = '';
  hashtagForm.value = '';
  commentForm.value = '';
  errorMessage = '';
  resetFilter();
  resetZoomPhoto();
  pristine.reset();

  imgBtnUploadCansel.removeEventListener('click', onCloseModalForm);
  document.removeEventListener('keydown', onDocumentEscKeydown);
  document.removeEventListener('click', onDocumentClickModal);

  toggleVisibility();
}

function onDocumentEscKeydown(evt) {
  if (currentMessageElement) {
    onEscKeydown(evt, onMessageClose);
  } else if (document.activeElement !== hashtagForm && document.activeElement !== commentForm) {
    onEscKeydown(evt, onCloseModalForm);
  }
}

function onDocumentClickModal(evt) {
  if (!modalForm.contains(evt.target) && evt.target !== uploadImgFormElement && !currentMessageElement) {
    onCloseModalForm();
  }
}

function onMessageClose() {
  if (currentMessageElement) {
    currentMessageElement.remove();
    currentMessageElement = null;
  }
  document.removeEventListener('keydown', onMessageEscKeydown);
  document.removeEventListener('click', onDocumentClickMessage);
  document.removeEventListener('click', onDocumentClickModal);
}

function onMessageEscKeydown(evt) {
  onEscKeydown(evt, onMessageClose);
}

function onDocumentClickMessage(evt) {
  if (currentMessageElement && !currentMessageElement.querySelector('.success__inner, .error__inner').contains(evt.target)) {
    onMessageClose();
  }
}

const showMessage = (template) => {
  const messageElement = template.cloneNode(true);
  pageBody.append(messageElement);
  currentMessageElement = messageElement;

  if (messageElement.classList.contains('hidden')) {
    messageElement.classList.remove('hidden');
  }

  const closeButton = messageElement.querySelector('.error__button') || messageElement.querySelector('.success__button');

  if (closeButton) {
    closeButton.addEventListener('click', onMessageClose);
  }

  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onDocumentClickMessage);
};

const commentValidation = (value) => {
  errorMessage = '';

  const commentText = value.trim().split('');

  if (!commentText || commentText.length <= 140) {
    return true;
  } else {
    errorMessage = 'Длина комментария должна быть не больше 140 символов';
    return false;
  }
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

const sendData = async (formElement) => {
  try {
    const sendDataForm = new FormData(formElement);
    await photoData.send(sendDataForm);
    onCloseModalForm();
    showMessage(successTemplate);
  } catch {
    showMessage(errorTemplate);
  } finally {
    imgBtnUploadSubmit.disabled = false;
    imgBtnUploadSubmit.textContent = 'Опубликовать';
  }
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
    () => errorMessage
  );

  uploadImgForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      imgBtnUploadSubmit.disabled = true;
      imgBtnUploadSubmit.textContent = 'Публикую...';
      sendData(uploadImgForm);
    }
  });
};

uploadImgFormElement.addEventListener('change', (evt) => {
  pristine.reset();
  toggleVisibility();
  loadPhoto(evt);
  imgBtnUploadCansel.addEventListener('click', onCloseModalForm);
  document.addEventListener('keydown', onDocumentEscKeydown);
  document.addEventListener('click', onDocumentClickModal);
});

initFormValidation();
