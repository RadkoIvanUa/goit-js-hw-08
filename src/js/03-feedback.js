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
const parsedFeedbackState = JSON.parse(savedFeedbackState);

let feedbackData = { email: '', message: '' };

if (savedFeedbackState) {
  feedbackData = parsedFeedbackState;
}

formWithSavedValue();

function onFormSubmit(evt) {
  evt.preventDefault();
  if (refs.emailInput.value && refs.messageInput.value) {
    console.log(feedbackData);
    localStorage.removeItem(STORAGE_KEY);
    feedbackData = { email: '', message: '' };
    refs.form.reset();
  }
}

function onFormInput(evt) {
  //   console.log();
  const inputName = evt.target.name;
  const inputValue = evt.target.value;

  feedbackData[inputName] = inputValue;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackData));
}

function formWithSavedValue() {
  if (feedbackData.email) {
    refs.emailInput.value = feedbackData.email;
  }
  if (feedbackData.message) {
    refs.messageInput.value = feedbackData.message;
  }
}
