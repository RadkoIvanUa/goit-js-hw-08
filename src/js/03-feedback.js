import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  emailInput: document.querySelector('.js-email'),
  messageInput: document.querySelector('.js-message'),
};

const STORAGE_KEY = 'feedback-form-state';

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

const savedFeedbackState = localStorage.getItem(STORAGE_KEY);
let parsedFeedbackState = JSON.parse(savedFeedbackState) ?? {
  email: '',
  message: '',
};

formWithSavedValue();

function onFormSubmit(evt) {
  evt.preventDefault();
  if (refs.emailInput.value && refs.messageInput.value) {
    console.log(parsedFeedbackState);
    localStorage.removeItem(STORAGE_KEY);
    parsedFeedbackState = { email: '', message: '' };
    refs.form.reset();
  } else {
    alert('All fields must be filled in to submit feedback!!!');
  }
}

function onFormInput(evt) {
  const inputName = evt.target.name;
  const inputValue = evt.target.value;

  parsedFeedbackState[inputName] = inputValue;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedFeedbackState));
}

function formWithSavedValue() {
  if (parsedFeedbackState.email) {
    refs.emailInput.value = parsedFeedbackState.email;
  }
  if (parsedFeedbackState.message) {
    refs.messageInput.value = parsedFeedbackState.message;
  }
}
