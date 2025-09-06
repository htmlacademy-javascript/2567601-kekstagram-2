import { onEscKeydown } from './util';
import { resetFilter } from './filterPhotos';
import { loadPhoto } from './loadPhoto';
import { photoData } from './api';

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
};

function onCloseModalForm () {
  uploadImgFormElement.value = '';
  hashtagForm.value = '';
  commentForm.value = '';

  imgBtnUploadCansel.removeEventListener('click', onCloseModalForm);
  document.removeEventListener('keydown', onDocumentEscKeydown);

  toggleVisibility();
  resetFilter();
}

function onDocumentEscKeydown (evt) {
  if (!commentForm.value && !hashtagForm.value) {
    onEscKeydown(evt, onCloseModalForm);
  }
}

const closeMessage = () => {
  if (currentMessageElement) {
    currentMessageElement.remove();
    currentMessageElement = null;
  }
  document.removeEventListener('keydown', onMessageEscKeydown);
  document.removeEventListener('click', onDocumentClickMessage);
};

function onMessageEscKeydown (evt){
  onEscKeydown(evt, closeMessage);
}

function onDocumentClickMessage (evt){
  if (currentMessageElement && !currentMessageElement.contains(evt.target)) {
    closeMessage();
  }
}

const showMessage = (template) => {
  const messageElement = template.cloneNode(true);
  pageBody.append(messageElement);
  currentMessageElement = messageElement;

  const closeButton = messageElement.querySelector('.error__button') || messageElement.querySelector('.success__button');

  if (closeButton) {
    closeButton.addEventListener('click', closeMessage);
  }

  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onDocumentClickMessage);
};


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
    'Длина комментария должна быть не больше 140 символов'
  );

  uploadImgForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      imgBtnUploadSubmit.disabled = true;
      imgBtnUploadSubmit.textContent = 'Публикую...';
      await sendData(uploadImgForm);
    }
  });
};

uploadImgFormElement.addEventListener('change',(evt) => {
  toggleVisibility();

  loadPhoto(evt);
  imgBtnUploadCansel.addEventListener('click', onCloseModalForm);
  document.addEventListener('keydown', onDocumentEscKeydown);
});

initFormValidation();
