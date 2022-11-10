import { isEscapeKey } from './util.js';

const errorPopup = document.querySelector('#error')
  .content
  .querySelector('.error');

const successPopup = document.querySelector('#success')
  .content
  .querySelector('.success');

const renderMessage = (text) => {
  document.body.append(text);

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeUserModal();
    }
  };

  const onPopupCloseClick = () => {
    closeUserModal();
  };
  //тут декларативное объявление, так как она нужна выше
  function closeUserModal() {
    text.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  }

  document.addEventListener('keydown', onDocumentKeydown);
  text.addEventListener('click', onPopupCloseClick);
};

const showErrorMessage = () => {
  const errorMessage = errorPopup.cloneNode(true);
  renderMessage(errorMessage);
};

const showSuccessMessage = () => {
  const successMessage = successPopup.cloneNode(true);
  renderMessage(successMessage);
};

export { showErrorMessage, showSuccessMessage };
