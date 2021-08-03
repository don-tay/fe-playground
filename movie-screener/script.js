const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=2c4156e951fcf8f7d77c29388b8f6796';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=2c4156e951fcf8f7d77c29388b8f6796&query=';
const DEFAULT_IMG =
  'https://images.unsplash.com/photo-1627570173170-376a1cf0b357?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=958&q=80';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const header = document.getElementById('header');

getMovies(API_URL);

async function getMovies(url) {
  const data = await (await fetch(url)).json();
  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = '';
  movies.forEach(movie => {
    const {
      title,
      poster_path,
      vote_average,
      overview,
      popularity,
      release_date,
    } = movie;

    const movieElem = document.createElement('div');
    const imgSrc = poster_path ? IMG_PATH + poster_path : DEFAULT_IMG;
    movieElem.classList.add('movie');
    movieElem.innerHTML = `
        <img
        src=${imgSrc}
        alt="${title}"
        />
        <div class="movie-info">
            <h3>${title}</h3>
            <span class=${getClassByRating(vote_average)}>${vote_average}</span>
        </div>
        <div class="overview">
            <span>Released: <b>${release_date}</b></span>
            <span>Popularity Score: <b>${popularity}</b></span>
            <h3>Overview</h3>
            ${overview}
        </div>
    `;
    main.appendChild(movieElem);
  });
}

function getClassByRating(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

const debounce = (func, delay) => {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

// search field logic
form.addEventListener(
  'keyup',
  debounce(e => {
    e.preventDefault();

    const searchTerm = search.value?.trim();

    if (searchTerm && searchTerm !== '') {
      getMovies(SEARCH_API + searchTerm);
    } else {
      getMovies(API_URL);
    }
  }, 300)
);

// disable form from being submitted (since keyup event is used)
form.addEventListener('submit', e => {
  e.preventDefault();
});

// add sticky header
document.addEventListener('scroll', () => {
  if (window.pageYOffset > header.offsetTop) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
});
