import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './Welcome.jsx';
import MovieList from './pages/MoviesList.jsx';
import AddMovie from './MoviesAdd.jsx'; 
import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/"><button>Usuari</button></Link>
        <Link to="/movies/list"><button>Llistat de pel·licules</button></Link>
        <Link to="/movies/add"><button>Afegeix una pel·licula</button></Link>
      </nav>
      <Routes>
        <Route path="/" element={<Welcome username="Jianjing"/>} />
        <Route path="/movies/list" element={<MovieList/>} />
        <Route path="/movies/add" element={<AddMovie/>} />
      </Routes>
    </Router>
  );
}

export default App;