const display = document.getElementById('display');
const history = document.getElementById('history');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let resultDisplayed = false;
const MAX_LENGTH = 12;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    // AC — очистка всего
    if (button.classList.contains('ac')) {
      currentInput = '';
      display.textContent = '0';
      history.textContent = '';
      return;
    }

    // Удаление последнего символа
    if (button.classList.contains('del')) {
      currentInput = currentInput.slice(0, -1);
      display.textContent = currentInput || '0';
      return;
    }

    // Выполнение операции
    if (button.classList.contains('equal')) {
      try {
        if (currentInput === '' || /[\+\-\*\/.]$/.test(currentInput)) return;

        const result = eval(currentInput);
        if (!isFinite(result)) throw new Error();

        history.textContent = currentInput;
        display.textContent = result;
        currentInput = result.toString();
        resultDisplayed = true;
      } catch {
        display.textContent = 'Ошибка';
        currentInput = '';
      }
      return;
    }

    // Ограничение длины
    if (currentInput.length >= MAX_LENGTH) return;

    // Если после результата вводим число — очищаем
    if (resultDisplayed && /[0-9]/.test(value)) {
      currentInput = '';
      resultDisplayed = false;
    }

    // Запрет на ввод 00... в начале
    if (value === '0' && currentInput === '0') return;
    if (/^0[0-9]/.test(currentInput + value)) return;

    // Запрет на две точки подряд
    if (value === '.' && currentInput.endsWith('.')) return;

    // Если только "." — добавляем "0."
    if (value === '.' && currentInput === '') currentInput = '0';

    // Добавление символа
    currentInput += value;
    display.textContent = currentInput;
  });
});

// Ввод с клавиатуры
document.addEventListener('keydown', e => {
  const allowedKeys = /[0-9\+\-\*\/\.]/;
  if (allowedKeys.test(e.key)) {
    document.querySelector(`button:contains('${e.key}')`);
    if (currentInput.length < MAX_LENGTH) {
      if (resultDisplayed && /[0-9]/.test(e.key)) {
        currentInput = '';
        resultDisplayed = false;
      }
      currentInput += e.key;
      display.textContent = currentInput;
    }
  } else if (e.key === 'Enter') {
    document.querySelector('.equal').click();
  } else if (e.key === 'Backspace') {
    document.querySelector('.del').click();
  } else if (e.key.toLowerCase() === 'c') {
    document.querySelector('.ac').click();
  }
});
