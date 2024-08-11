import axios from 'axios';

const pokemonApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
});

export const fetchPokemon = async (pokemon: string) => {
  try {
    const response = await pokemonApi.get(`pokemon/${pokemon}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};