const pokeContainer = document.getElementById('poke-container');

const POKEMON_COUNT = 150;
const API_URL = `https://pokeapi.co/api/v2/pokemon`;

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

const fetchPokemons = async () => {
  for (let i = 1; i <= POKEMON_COUNT; ++i) {
    await getPokemon(i);
  }
};

const getPokemon = async id => {
  const url = `${API_URL}/${id}`;
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
  console.log(data);
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

fetchPokemons();
