import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import MovieCard from '../MovieCard.jsx';

export const firebaseConfig = {
  apiKey: "AIzaSyCrQA_EKSLpjdoQUmysdOqHek3s53IwrvU",

  authDomain: "peli-a91a1.firebaseapp.com",

  projectId: "peli-a91a1",

  storageBucket: "peli-a91a1.appspot.com",

  messagingSenderId: "639984858847",

  appId: "1:639984858847:web:2768f867f4e837fbb7db6a",

  measurementId: "G-C8SZ42NN69"

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