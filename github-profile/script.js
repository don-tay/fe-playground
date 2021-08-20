const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const API_URL = 'https://api.github.com/users/';

async function getUser(username) {
  try {
    const { data } = await axios.get(`${API_URL + username}`);
    createUserCard(data);
    await getRepos(username);
  } catch (err) {
    if (err.response.status === 404) {
      return createErrorCard(`User ${username} not found.`);
    }
    console.error(err);
  }
}

async function getRepos(username) {
  try {
    const { data } = await axios.get(
      `${API_URL + username}/repos?sort=created`
    );
    addReposToCard(data);
  } catch (err) {
    createErrorCard('Error fetching repos');
  }
}

function createErrorCard(msg) {
  const cardHtml = `
    <div class="card">
        <h2>${msg}</h2>
    </div>
    `;
  main.innerHTML = cardHtml;
}

function createUserCard(user) {
  const cardHtml = `
  <div class="card">
    <div>
      <img
        src="${user.avatar_url}"
        alt="${user.name}"
        class="avatar"
      />
    </div>

    <div class="user-info">
      <h2>${user.name}</h2>
      <p>${user.bio}</p>

      <ul>
        <li>${user.followers} <strong>Followers</strong></li>
        <li>${user.following} <strong>Following</strong></li>
        <li>${user.public_repos} <strong>Repos</strong></li>
      </ul>

      <div id="repos"></div>
    </div>
  </div>`;

  main.innerHTML = cardHtml;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById('repos');

  repos.slice(0, 5).forEach(repo => {
    const repoEl = document.createElement('a');
    repoEl.classList.add('repo');
    repoEl.href = repo.html_url;
    repoEl.target = '_blank';
    repoEl.innerText = repo.name;

    reposEl.appendChild(repoEl);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const user = search.value;
  if (user) {
    getUser(user);

    search.value = '';
  }
});
