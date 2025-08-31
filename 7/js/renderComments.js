const COUNT = 5;
let currentCount = 0;
let comments = [];

const fullPhotoContainer = document.querySelector('.big-picture');
const fullPhotoComments = fullPhotoContainer.querySelector('.social__comments');
const fullPhotoComment = fullPhotoComments.querySelector('.social__comment');
const fullPhotoCountComments = fullPhotoContainer.querySelector('.social__comment-count');
const fullPhotoLoader = fullPhotoContainer.querySelector('.social__comments-loader');

export const renderComments = (commentsToRender) => {
  const fullPhotoCommentsFragment = document.createDocumentFragment();

  commentsToRender.forEach((comment) => {
    const fullPhotoCommentTemplate = fullPhotoComment.cloneNode(true);

    fullPhotoCommentTemplate.querySelector('.social__picture').src = comment.avatar;
    fullPhotoCommentTemplate.querySelector('.social__picture').alt = comment.name;
    fullPhotoCommentTemplate.querySelector('.social__text').textContent = comment.message;

    fullPhotoCommentsFragment.appendChild(fullPhotoCommentTemplate);
  });

  fullPhotoComments.append(fullPhotoCommentsFragment);
};

export const renderLimitedComments = () => {
  if (currentCount === 0) {
    fullPhotoComments.innerHTML = '';
  }

  const renderPageComments = comments.slice(currentCount, currentCount + COUNT);
  const renderCommentsLength = renderPageComments.length + currentCount;

  renderComments(renderPageComments);

  fullPhotoCountComments.querySelector('.social__comment-shown-count').textContent = `${renderCommentsLength}`;
  fullPhotoCountComments.querySelector('.social__comment-total-count').textContent = comments.length;

  if (renderCommentsLength >= comments.length) {
    fullPhotoLoader.classList.add('hidden');
  } else {
    fullPhotoLoader.classList.remove('hidden');
  }

  currentCount += COUNT;
};

export const onCommentLoaderClick = () => {
  renderLimitedComments();
};

export const initComments = (photoComments) => {
  comments = photoComments;
  currentCount = 0;
  fullPhotoLoader.classList.remove('hidden');
  renderLimitedComments();

  fullPhotoLoader.addEventListener('click', onCommentLoaderClick);
};

export const cleanupComments = () => {
  fullPhotoComments.innerHTML = '';
  currentCount = 0;
  comments = [];
  fullPhotoLoader.removeEventListener('click', onCommentLoaderClick);
};
