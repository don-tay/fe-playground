const resultEl = document.getElementById('result');
const filterEl = document.getElementById('filter');

const listItems = [];

getData();

async function getData() {
  const res = await fetch('https://randomuser.me/api?results=50');
  const { results } = await res.json();

  resultEl.innerHTML = '';

  results.forEach(user => {
    const li = document.createElement('li');

    listItems.push(li);

    li.innerHTML = `
      <img src="${user.picture.large}" alt="${user.name.first}" />
      <div class="user-info">
        <h4>${user.name.first} ${user.name.last}</h4>
        <p>${user.location.city}, ${user.location.country}</p>
      </div>
    `;

    resultEl.appendChild(li);
  });
}

filterEl.addEventListener('input', e => {
  const searchTerm = e.target.value.toLowerCase();
  listItems.forEach(item => {
    const itemTextToken = item.innerText.toLowerCase().trim();
    if (itemTextToken.includes(searchTerm)) {
      item.classList.remove('hide');
    } else {
      item.classList.add('hide');
    }
  });
});
