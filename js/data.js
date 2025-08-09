import { getRandomArrayElement, getRandomInteger } from './util';

const PHOTO_DESCRIPTION = [
  'братите внимание, в тексте задания вы будете',
  'встречать текст',
  'в фигурных скобках. Такой текст будет означать, что на месте этого',
  'текста должно появиться значение, которое вы',
  'возьмёте из данных. Например, в шаблоне может быть написано <div>{{x}}</div>, и это',
  'будет значить, что {{x}} нужно заменить на значение переменной x. Если',
  'переменная будет равна 100, то разметка',
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Рузиль',
  'Осман',
  'Влад',
  'Альберт',
  'Максим',
  'Данил',
  'Аделя'
];

const getRandomId = () => {
  let id = 0;
  return function () {
    id += 1;
    return id;
  };
};

const photoId = getRandomId();
const commentId = getRandomId();

const createComments = () => ({
  id: commentId(),
  avatar: `mg/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGE),
  name: getRandomArrayElement(NAMES),
});

const createPhoto = () => ({
  url: `photos/${photoId()}.jpg`,
  description: getRandomArrayElement(PHOTO_DESCRIPTION),
  likes: getRandomInteger(15, 200),
  comments: Array.from({ length: getRandomInteger(0, 30) }, createComments),
});

Array.from({ length: 25 }, createPhoto);
