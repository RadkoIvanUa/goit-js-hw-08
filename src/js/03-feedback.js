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
let feedbackState = JSON.parse(savedFeedbackState) ?? {
  email: '',
  message: '',
};

formWithSavedValue();

function onFormSubmit(evt) {
  evt.preventDefault();
  if (refs.emailInput.value && refs.messageInput.value) {
    console.log(feedbackState);
    localStorage.removeItem(STORAGE_KEY);
    feedbackState = { email: '', message: '' };
    refs.form.reset();
  } else {
    alert('All fields must be filled in to submit feedback!!!');
  }
}

function onFormInput(evt) {
  const inputName = evt.target.name;
  const inputValue = evt.target.value;

  feedbackState[inputName] = inputValue;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackState));
}

function formWithSavedValue() {
  if (feedbackState.email) {
    refs.emailInput.value = feedbackState.email;
  }
  if (feedbackState.message) {
    refs.messageInput.value = feedbackState.message;
  }
}
