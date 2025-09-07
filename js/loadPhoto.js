const uploadImgForm = document.querySelector('.img-upload__form');

export const imgPreview = uploadImgForm.querySelector('.img-upload__preview').querySelector('img');
const effectsPreview = uploadImgForm.querySelectorAll('.effects__preview');

export const loadPhoto = (evt) => {
  const file = evt.target.files[0];
  if (!file) {
    return;
  }

  const imageUrl = URL.createObjectURL(file);

  imgPreview.src = imageUrl;

  effectsPreview.forEach((effect) => {
    effect.style.backgroundImage = `url(${imageUrl})`;
  });
};
