import React from 'react';

const MatchResults = ({ matches }) => {
  return (
    <div>
      <h2>Match Results</h2>
      {matches.map((week, index) => (
        <div key={index}>
          <h3>Week {week.week}</h3>
          <ul>
            {week.matches.map((result, matchIndex) => (
              <li key={matchIndex}>
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
      ))}
    </div>
  );
};

export default MatchResults;