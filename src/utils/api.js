

import axios from 'axios';
const BASE_URL = 'https://hoblist.com/api';


const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',

  },
});

// Define API endpoints as functions
export const fetchMovies = async () => {
  try {
    const response = await apiClient.post('/movieList', {
      category: 'movies',
      language: 'kannada',
      genre: 'all',
      sort: 'voting'
    });
    return response.data.result;
  } catch (error) {
    console.error('Error fetching movies', error);
    throw error;
  }
};
