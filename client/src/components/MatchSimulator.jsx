// No usage**

import React from 'react';

const MatchSimulator = ({ matches }) => {
  return (
    <div>
      <h1>Match Results</h1>
      <ul>
        {matches.map((result, index) => (
          <li key={index}>
            <div>{result.teamA.name} {result.teamA.score} - {result.teamB.score} {result.teamB.name}</div>
            <div>
              {result.teamA.goals.map((goal, idx) => (
                <span key={idx}>{goal}{idx < result.teamA.goals.length - 1 ? ', ' : ''}</span>
              ))} - 
              {result.teamB.goals.map((goal, idx) => (
                <span key={idx}>{goal}{idx < result.teamB.goals.length - 1 ? ', ' : ''}</span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchSimulator;