const jokeElem = document.getElementById('joke');
const jokeBtn = document.getElementById('jokeBtn');

const generateJoke = async () => {
  const res = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json',
    },
    method: 'GET',
  });
  const data = await res.json();
  jokeElem.innerHTML = data.joke;
};

jokeBtn.addEventListener('click', generateJoke);

generateJoke();
