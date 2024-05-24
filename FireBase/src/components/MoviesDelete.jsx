import React from 'react';
import firebase from 'firebase/compat/app';

function MoviesDelete({ movie, movies, setMovies }) {
  const deleteMovie = async () => {
    const db = firebase.firestore();

    await db.collection('Movies').doc(movie.id).delete();

    const newMovies = movies.filter(m => m.id !== movie.id);
    setMovies(newMovies);
  };

  return (
    <button onClick={deleteMovie}>
      Eliminar
    </button>
  );
}

export default MoviesDelete;