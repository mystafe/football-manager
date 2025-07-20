import React from 'react';

const Table = ({ table }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Team</th>
          <th>Strength</th>
          <th>Played</th>
          <th>Won</th>
          <th>Drawn</th>
          <th>Lost</th>
          <th>Goals For</th>
          <th>Goals Against</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {table.map((team, index) => (
          <tr key={index}>
            <td>{team.name}</td>
            <td>{team.strength.toFixed(2)}</td> {/* Gücü virgülden sonra iki basamak olacak şekilde formatlıyoruz */}
            <td>{team.played}</td>
            <td>{team.won}</td>
            <td>{team.drawn}</td>
            <td>{team.lost}</td>
            <td>{team.goalsFor}</td>
            <td>{team.goalsAgainst}</td>
            <td>{team.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;