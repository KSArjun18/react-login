import React from 'react';
import MoviesList from '../components/MoviesList';

function MoviesListPage() {
  return (
    <div className="container mt-5">
      <h2 className='text-white'>Movies List</h2>
      <MoviesList />
    </div>
  );
}

export default MoviesListPage;
