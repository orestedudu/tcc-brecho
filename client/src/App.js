import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';

function App() {
  
  const [greeting, setGreeting] = useState([]);

  async function fetchGreeting(params) {
    const response = await fetch('http://localhost.:3001');
    setGreeting(await response.json()); 
  }
  
  useEffect(() => {
    fetchGreeting();
  }, [greeting]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          HELLO REACT!
        </p>
        <p> o greeting é: {greeting}</p>
      </header>
    </div>
  );
}

export default App;
