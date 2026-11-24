const button = document.getElementById('actionBtn');
const message = document.getElementById('message');

button.addEventListener('click', () => {
  message.textContent = 'Сайт работает! JavaScript успешно подключён.';
  message.style.marginTop = '16px';
});