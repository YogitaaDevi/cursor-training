import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import LegacyCounter from './component/LegacyCounter';

function App({ Counter = LegacyCounter }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('App mounted');
  }, []);

  const handleIncrement = (newCount) => {
    console.log('Count:', newCount);
    setCount(newCount);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Counter initialCount={count} onIncrement={handleIncrement} />
    </div>
  );
}

export default App;
