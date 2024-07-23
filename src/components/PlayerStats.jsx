import React from 'react';

const PlayerStats = ({ stats }) => {
  console.log('Player Stats Component:', stats); // Debugging

  const sortedStats = Array.isArray(stats) ? [...stats].sort((a, b) => {
    if (b.goals === a.goals) {
      return b.strength - a.strength;
    }
    return b.goals - a.goals;
  }) : [];

  return (
    <div>
      <h2>Player Stats</h2>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Team</th>
            <th>Position</th>
            <th>Strength</th>
            <th>Goals</th>
            <th>Strength Change</th>
          </tr>
        </thead>
        <tbody>
          {sortedStats.map((player, index) => (
            <tr key={index}>
              <td>{player.name}</td>
              <td>{player.team}</td>
              <td>{player.position}</td>
              <td>{player.strength.toFixed(2)}</td>
              <td>{player.goals}</td>
              <td>{player.strengthChange}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerStats;