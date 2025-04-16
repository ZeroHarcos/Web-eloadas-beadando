
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function KoPapirOllo() {
  const choices = ['Kő', 'Papír', 'Olló'];
  const [jatekosValasztas, setJatekosValasztas] = useState(null);
  const [gepValasztas, setGepValasztas] = useState(null);
  const [eredmeny, setEredmeny] = useState('');

  const jatekInditasa = (valasztas) => {
    const gep = choices[Math.floor(Math.random() * choices.length)];
    setGepValasztas(gep);
    setJatekosValasztas(valasztas);

    if (gep === valasztas) {
      setEredmeny("Döntetlen!");
    } else if (
      (gep === 'Kő' && valasztas === 'Olló') ||
      (gep === 'Papír' && valasztas === 'Kő') ||
      (gep === 'Olló' && valasztas === 'Papír')
    ) {
      setEredmeny('Vesztettél!');
    } else {
      setEredmeny('Nyertél!');
    }
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>Kő Papír Olló</h1>
      <div>
        {choices.map((valasztas) => (
          <button key={valasztas} onClick={() => jatekInditasa(valasztas)} style={{ margin: '10px', padding: '10px 20px' }}>
            {valasztas}
          </button>
        ))}
      </div>
      {jatekosValasztas && gepValasztas && (
        <div style={{ marginTop: '20px' }}>
          <p>Te választottad: <strong>{jatekosValasztas}</strong></p>
          <p>Számítógép választása: <strong>{gepValasztas}</strong></p>
          <h2>{eredmeny}</h2>
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<KoPapirOllo />, document.getElementById('root'));
