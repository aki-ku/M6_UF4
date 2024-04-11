import React from 'react';

const Tasca = ({ id, text, completada, completarTasca, eliminarTasca }) => {
  const handleCompletarClick = () => {
    completarTasca(id);
  };

  const handleEliminarClick = () => {
    eliminarTasca(id);
  };

  return (
    <div style={{ textDecoration: completada ? 'line-through' : 'none' }} onClick={handleCompletarClick}>
      <span>{text}</span>
      <button onClick={handleEliminarClick}>Eliminar</button>
    </div>
  );
};

export default Tasca;
