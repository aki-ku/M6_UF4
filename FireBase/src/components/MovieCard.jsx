import React from 'react';
import MoviesDelete from './MoviesDelete';

function MovieCard({ movie, movies, setMovies }) {
  const { title, image, rate, description, duration } = movie;

  return (
    <div style={{ display: 'flex', marginBottom: '20px' }}>
      <img src={image} alt={title} style={{ width: '200px', height: 'auto', marginRight: '20px' }} />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <h2>{title} <MoviesDelete movie={movie} movies={movies} setMovies={setMovies} /></h2>
        <p>Nota: {rate}/10 </p>
        <p>Descripció: {description}</p>
        <p>Duració: {duration} minuts</p>
      </div>
    </div>
  );
}

export default MovieCard;