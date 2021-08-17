const button = document.getElementById('button');
const toasts = document.getElementById('toasts');

const messages = [
  'Hey There! You got a message!',
  'Hullooooooo, message inbound',
  'New notification',
  'Message for you!',
];

const statuses = ['info', 'success', 'error'];

button.addEventListener('click', createNotification);

function createNotification() {
  const notif = document.createElement('div');
  notif.classList.add('toast');
  notif.classList.add(getRandomClass());

  notif.innerText = getRandomMessage();

  toasts.appendChild(notif);

  // remove notification after 3s
  setTimeout(() => {
    notif.remove();
  }, 3000);
}

function getRandomMessage() {
  return messages[Math.floor(Math.random() * messages.length)];
}

function getRandomClass() {
  return statuses[Math.floor(Math.random() * statuses.length)];
}
