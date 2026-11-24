const button = document.getElementById('actionBtn');
const message = document.getElementById('message');
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('nameInput');
const textInput = document.getElementById('textInput');
const formStatus = document.getElementById('formStatus');

let clicks = 0;

button.addEventListener('click', () => {
  clicks += 1;
  message.textContent = `Кнопка нажата раз: ${clicks}`;
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const userName = nameInput.value.trim();
  formStatus.textContent = `Спасибо, ${userName}! Сообщение принято (демо-форма без отправки на сервер).`;
  form.reset();
});