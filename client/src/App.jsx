import React from 'react';
import LeagueTable from './components/LeagueTable';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>Football Manager</h1>
      <nav>
        <a href="#teams">Teams</a>
        <a href="#fixtures">Fixture</a>
        <a href="#results">Results</a>
      </nav>
      <LeagueTable />
      <footer>
        <p>Developed by Mustafa Evleksiz</p>
      </footer>
    </div>
  );
}

export default App;