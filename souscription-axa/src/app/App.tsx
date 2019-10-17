import React from 'react';

const App: React.FC = () => (
  <>
    <div className="af-title-bar">
      <div className="af-title-bar__wrapper container-fluid container">
        <h1 className="af-title-bar__title">
          Exemple
          <small className="af-title-bar__subtitle">Design</small>
        </h1>
      </div>
    </div>
    <div className="af-home container">
      <span>Ceci est une page d'exemple.</span>
    </div>
  </>
);

export default App;
