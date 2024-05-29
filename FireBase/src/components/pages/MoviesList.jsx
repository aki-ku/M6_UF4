import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import MovieCard from '../MovieCard.jsx';

export const firebaseConfig = {
  apiKey: "AIzaSyCA2MH960iZkZaCiFVXDFj9EkbYtS9s58Q",
  authDomain: "act7-ef80a.firebaseapp.com",
  projectId: "act7-ef80a",
  storageBucket: "act7-ef80a.appspot.com",
  messagingSenderId: "548310319299",
  appId: "1:548310319299:web:ec3b8135edef3941f12276",
  measurementId: "G-EW6RTP5Q63",
};

firebase.initializeApp(firebaseConfig);

function MoviesList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const db = firebase.firestore();
      const snapshot = await db.collection('Movies').get();
      const moviesArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMovies(moviesArray);
    };

    fetchMovies();
  }, []);

  return (
    <div>
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} movies={movies} setMovies={setMovies} />
      ))}
    </div>
  );
}

export default MoviesList;