const fullPhotoContainer = document.querySelector('.big-picture');
const fullPhotoComments = fullPhotoContainer.querySelector('.social__comments');
const fullPhotoComment = fullPhotoComments.querySelector('.social__comment');
const fullPhotoCountComments = fullPhotoContainer.querySelector('.social__comment-count');
const fullPhotoLoader = fullPhotoContainer.querySelector('.social__comments-loader');
fullPhotoComments.innerHTML = '';

export const renderComments = (comments) => {
  const fullPhotoCommentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const fullPhotoCommentTemplate = fullPhotoComment.cloneNode(true);

    fullPhotoCommentTemplate.querySelector('.social__picture').src = comment.avatar;
    fullPhotoCommentTemplate.querySelector('.social__picture').alt = comment.name;
    fullPhotoCommentTemplate.querySelector('.social__text').textContent = comment.message;

    fullPhotoCommentsFragment.appendChild(fullPhotoCommentTemplate);
  });

  fullPhotoComments.append(fullPhotoCommentsFragment);
  fullPhotoLoader.classList.remove('hidden');
  fullPhotoCountComments.classList.remove('hidden');
};


