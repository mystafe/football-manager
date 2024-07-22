import React from 'react';
import TeamList from './components/TeamList';
import LeagueTable from './components/LeagueTable';

const App = () => {
  return (
    <div>
      <h1>Football Manager by Mustafa Evleksiz - 0.2.1</h1>
      <TeamList />
      <LeagueTable />
    </div>
  );
};

export default App;