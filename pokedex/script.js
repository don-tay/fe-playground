const poke_container = document.getElementById('poke-container');

const POKEMON_COUNT = 150;
const API_URL = `https://pokeapi.co/api/v2/pokemon/`;

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
  const pokemons = [];
  for (let i = 1; i <= POKEMON_COUNT; ++i) {
    pokemons.push(getPokemon(i));
  }
  await Promise.all(pokemons);
};

const getPokemon = async id => {
  const url = `${API_URL}/${id}/`;
  const res = await fetch(url);
  const data = res.json();
};

fetchPokemons();
