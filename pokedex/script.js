const searchInput = document.getElementById('search-input');
const pokeContainer = document.getElementById('poke-container');
const genContainer = document.getElementById('gen-container');

const DEFAULT_POKEMON_COUNT = 150;
let POKEMON_NAMES_AND_URL = [];

const POKEMON_URL = `https://pokeapi.co/api/v2/pokemon`;
const GEN_URL = `https://pokeapi.co/api/v2/generation`;

const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5',
};

const colorArr = Object.values(colors);

const debounce = (func, delay) => {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

searchInput.addEventListener(
  'input',
  debounce(async e => {
    pokeContainer.innerHTML = '';
    const searchTerm = e.target.value.toLowerCase().trim();
    if (!searchTerm) {
      return fetchPokemons();
    }
    const filteredResults = POKEMON_NAMES_AND_URL.filter(({ name }) =>
      name.includes(searchTerm)
    );
    const pokeIdArr = filteredResults
      .map(
        ({ url }) =>
          url
            .split('/')
            .filter(str => str !== '')
            .reverse()[0]
      )
      .sort((a, b) => a - b);
    for (const pokeId of pokeIdArr) {
      await getPokemon(pokeId);
    }
  }, 600)
);

const getPokemonNameAndUrl = async () => {
  const res = await fetch(POKEMON_URL);
  const { count } = await res.json();
  const url = `${POKEMON_URL}?limit=${count}`;
  const res2 = await fetch(url);
  const { results } = await res2.json();
  POKEMON_NAMES_AND_URL = results;
};

const generateBtn = async () => {
  const reqUrl = `${GEN_URL}`;
  const res = await fetch(reqUrl);
  const { results } = await res.json();
  const genArr = results.map(
    ({ url }) =>
      url
        .split('/')
        .filter(str => str !== '')
        .reverse()[0]
  );
  genArr.forEach((gen, idx) => {
    const btn = document.createElement('button');
    btn.classList.add('btn');
    btn.style.backgroundColor = colorArr[idx];
    btn.innerText = `Gen ${gen}`;
    btn.addEventListener('click', () => {
      const genBtns = document.querySelectorAll('#gen-container .btn');
      genBtns.forEach(btn => btn.classList.remove('active'));
      btn.classList.add('active');
      fetchPokemonByGen(gen);
    });
    genContainer.appendChild(btn);
  });
};

const fetchPokemonByGen = async gen => {
  const reqUrl = `${GEN_URL}/${gen}`;
  const res = await fetch(reqUrl);
  const { pokemon_species } = await res.json();
  const pokeIdArr = pokemon_species
    .map(
      ({ url }) =>
        url
          .split('/')
          .filter(str => str !== '')
          .reverse()[0]
    )
    .sort((a, b) => a - b);
  pokeContainer.innerHTML = '';
  for (const pokeId of pokeIdArr) {
    await getPokemon(pokeId);
  }
};

const fetchPokemons = async () => {
  for (let i = 1; i <= DEFAULT_POKEMON_COUNT; ++i) {
    await getPokemon(i);
  }
};

const getPokemon = async id => {
  const url = `${POKEMON_URL}/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  createCardHtml(data);
};

const createCardHtml = data => {
  const {
    id,
    species: { name },
    types,
    sprites: { front_default },
  } = data;
  const pokemonHtml = document.createElement('div');
  pokemonHtml.classList.add('pokemon');
  pokemonHtml.style.backgroundColor = colors[types[0].type.name];
  pokemonHtml.innerHTML = `
    <div class="img-container">
      <img
        src="${front_default}"
        alt="${name}"
      />
    </div>
    <div class="info">
      <span class="number">#${id}</span>
      <h3 class="name">${name}</h3>
      <small class="type">Type: <span>${types
        .map(({ type: { name } }) => name)
        .join(', ')}</span></small>
    </div>
  `;
  pokeContainer.appendChild(pokemonHtml);
};
getPokemonNameAndUrl();
generateBtn();
fetchPokemons();
