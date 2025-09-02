const STEP = 25;

const plusButton = document.querySelector('.scale__control--bigger');
const minusButton = document.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');
const uploadImgForm = document.querySelector('.img-upload__form');
const imgPreview = uploadImgForm.querySelector('.img-upload__preview').querySelector('img');

const changeScale = (direction) => {
  const currentValue = parseInt(scaleValue.value, 10);
  let newValue = currentValue + (STEP * direction);
  newValue = Math.max(0, Math.min(newValue, 100));

  scaleValue.value = `${newValue}%`;
  imgPreview.style.transform = `scale(${newValue / 100})`;
};

plusButton.addEventListener('click', () => {
  changeScale(1);
});
minusButton.addEventListener('click', () => {
  changeScale(-1);
});


