import React, { useState } from 'react';
import './App.css'

function Boton  ({ text, onClick, esClick })  {
  const btnClass = esClick ? 'btnClick' : 'btnReiniciar';

  return (
    <button className={btnClass} onClick={onClick}>
      {text}
    </button>
  );
};

function Counter() {
  const [numClicks, setNumClicks] = useState(0);

  const incrementNum = () => {
    setNumClicks(numClicks + 1);
    console.log('S\'ha clicat el botó de Clic');
  };

  const reiniciarNum = () => {
    setNumClicks(0);
    console.log('S\'ha clicat el botó de Reiniciar');
  };

  return (
    <div>
      <Boton text="Clic" onClick={incrementNum} esClick={true} />
      <Boton text="Reiniciar" onClick={reiniciarNum} esClick={false} />
      <p> {numClicks}</p>
    </div>
  );
};

export default Counter;

