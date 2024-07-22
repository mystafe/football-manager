import React from 'react';
import TeamList from './components/TeamList';
import LeagueTable from './components/LeagueTable';

const App = () => {
  return (
    <div>
      <h1>Football Manager</h1>
      <TeamList />
      <LeagueTable />
    </div>
  );
};

export default App;