import React, { useState } from 'react';
import ComponentFormulari from './ComponentFormulari';

const LlistatTasques = () => {
  const [tasques, setTasques] = useState([]);

  const afegirTasca = tasca => {
    const tasquesActuals = [...tasques, tasca];
    setTasques(tasquesActuals);
  };

  const eliminarTasca = id => {
    const tasquesRestants = tasques.filter((tasca, index) => index !== id);
    setTasques(tasquesRestants);
  };

  const completarTasca = id => {
    const tasquesActuals = tasques.map((tasca, index) =>
      index === id ? { ...tasca, completada: !tasca.completada } : tasca
    );
    setTasques(tasquesActuals);
  };

  return (
    <div>
      <ComponentFormulari funcAfegirTasca={afegirTasca} />
      <ul>
      {tasques.map((tasca, index) => (
        <li key={index}>
            <span>{tasca.nom}</span>
            <input
            type="checkbox"
            checked={tasca.completada}
            onChange={() => completarTasca(index)}
            />
            <button onClick={() => eliminarTasca(index)}>Eliminar</button>
        </li>
        ))}

      </ul>
    </div>
  );
};

export default LlistatTasques;
