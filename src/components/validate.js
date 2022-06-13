function showInputError(formElement, inputElement, inputErrorClass, errorMessage, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

function checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputErrorClass, inputElement.validationMessage, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

function setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

function enableValidation(validationData) {
  const {
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
  } = validationData;

  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

function validButtonSave (buttonSave) {
  if (!buttonSave.classList.contains('button_inactive')) {
    buttonSave.classList.add('button_inactive');
    buttonSave.setAttribute('disabled', '');
  }
}

export { enableValidation, validButtonSave };
