const uploadImgForm = document.querySelector('.img-upload__form');
export const imgPreview = uploadImgForm.querySelector('.img-upload__preview').querySelector('img');

export const loadPhoto = (evt) => {
  imgPreview.src = URL.createObjectURL(evt.target.files[0]);
};
