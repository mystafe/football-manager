import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeamList = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get('/data/teams.json')
      .then(response => {
        setTeams(response.data);
      });
  }, []);

  return (
    <div>
      <h1>Teams</h1>
      <ul>
        {teams.map(team => (
          <li key={team.id}>{team.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeamList;