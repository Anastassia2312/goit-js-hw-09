/*Використовуючи делегуваня, відстежуй на формі подію input і щоразу записуй у
 локальне сховище об'єкт з полями email і message, у яких зберігай поточні значення полів форми. 
 Нехай ключем для сховища буде рядок "feedback-form-state".
Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані,
то заповнюй ними поля форми.В іншому випадку поля повинні бути порожніми.
Під час сабміту форми очищай сховище і поля форми, а також виводь у консоль 
об'єкт з полями email, message та їхніми поточними значеннями.*/
const feedbackForm = document.querySelector('.feedback-form');
const STORAGE_DATA_KEY = 'feedback-form-state';

feedbackForm.addEventListener('input', event => {
  const formData = new FormData(feedbackForm);
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value.trim();
  });
  localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(formObject));
});

feedbackForm.addEventListener('submit', event => {
  event.preventDefault();
  localStorage.removeItem(STORAGE_DATA_KEY);
  feedbackForm.reset();
  console.log(initialFormData);
});

try {
  const initialFormData = JSON.parse(localStorage.getItem(STORAGE_DATA_KEY));
  if (initialFormData === Object) {
    Array.from(feedbackForm.elements).forEach(element => {
      const storageValue = initialFormData[element.name];

      element.value = storageValue;
    });
  }
} catch (e) {
  console.error('PARSE ERROR');
}
