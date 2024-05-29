import React from 'react';
import { Link } from 'react-router-dom';

function Welcome({ username }) {
  return (
    <div>
      <h1>Bon dia {username}!</h1>
    <p> Aquestes són les teves pelis</p>
    </div>
  );
}

export default Welcome;