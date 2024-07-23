import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeamList = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/teams`)
      .then(response => {
        setTeams(response.data);
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
      });
  }, []);

  return (
    <div>
      <h1>Teams</h1>
      <ul>
        {teams.map(team => (
          <li key={team._id}>
            {team.name}
            <ul>
              {team.players.map(player => (
                <li key={player._id}>
                  {player.name} - {player.position}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamList;