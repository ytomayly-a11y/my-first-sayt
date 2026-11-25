const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const toStep3Btn = document.getElementById('toStep3Btn');
const finishBtn = document.getElementById('finishBtn');
const copyBtn = document.getElementById('copyBtn');

const dateInput = document.getElementById('dateInput');
const timeInput = document.getElementById('timeInput');
const customOption = document.getElementById('customOption');
const summaryText = document.getElementById('summaryText');
const copyHint = document.getElementById('copyHint');

// Ставим сегодняшнюю дату по умолчанию
const today = new Date().toISOString().split('T')[0];
dateInput.value = today;

// Функция переключения экранов
function showStep(stepNumber) {
  document.querySelectorAll('.step').forEach((el) => el.classList.remove('active'));
  document.getElementById(`step${stepNumber}`).classList.add('active');
}

// Убегающая кнопка "Нет" (работает и мышкой, и на телефоне при касании)
function moveNoButton() {
  noBtn.style.position = 'fixed';
  const maxX = window.innerWidth - noBtn.offsetWidth - 20;
  const maxY = window.innerHeight - noBtn.offsetHeight - 20;

  const randomX = Math.max(20, Math.floor(Math.random() * maxX));
  const randomY = Math.max(20, Math.floor(Math.random() * maxY));

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
}

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  moveNoButton();
});
noBtn.addEventListener('click', moveNoButton);

// Переход ко второму шагу
yesBtn.addEventListener('click', () => {
  showStep(2);
});

// Переход к третьему шагу
toStep3Btn.addEventListener('click', () => {
  if (!dateInput.value || !timeInput.value) {
    alert('Выбери дату и время 😊');
    return;
  }
  showStep(3);
});

// Выбор карточек занятий (можно выбрать несколько)
document.querySelectorAll('.option-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('selected');
  });
});

// Формирование финального ответа
let finalMessage = '';

finishBtn.addEventListener('click', () => {
  const selected = Array.from(document.querySelectorAll('.option-btn.selected'))
    .map((btn) => btn.dataset.value);

  if (customOption.value.trim()) {
    selected.push(`✨ ${customOption.value.trim()}`);
  }

  if (selected.length === 0) {
    alert('Выбери хотя бы один вариант или напиши свой 😊');
    return;
  }

  const formattedDate = dateInput.value.split('-').reverse().join('.');
  const time = timeInput.value;

  summaryText.innerHTML = `
    <strong>Дата:</strong> ${formattedDate} в ${time}<br>
    <strong>План:</strong> ${selected.join(', ')}
  `;

  finalMessage = `Я согласна на свидание! ❤️\n📅 Когда: ${formattedDate} в ${time}\n✨ План: ${selected.join(', ')}`;
  showStep(4);
});

// Копирование текста в буфер обмена
copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(finalMessage);
    copyHint.textContent = 'Скопировано! Теперь вставь в чат и отправь 💌';
  } catch {
    copyHint.textContent = finalMessage;
  }
});