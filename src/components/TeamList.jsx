import React from 'react';
import './TeamList.css';

const TeamList = ({ teams }) => (
  <div className="teams">
    <h2>Teams</h2>
    <ul className="teams-list">
      {teams.map(team => (
        <li key={team.id}>{team.name}</li>
      ))}
    </ul>
  </div>
);

export default TeamList;