import React from 'react';
import Card from '../components/Card.jsx';
import { Link } from 'react-router-dom';

function IndexMenu() {
  return (
    <div>
      <Link to="/movies/list">
        <Card title="Llistat de pel·lícules" description="Veure totes les pel·lícules" />
      </Link>
      <Link to="/movies/add">
        <Card title="Afegir una pel·lícula" description="Afegir una nova pel·lícula a la llista" />
      </Link>
    </div>
  );
}

export default IndexMenu;