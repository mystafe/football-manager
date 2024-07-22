import React from 'react';

const MatchResults = ({ matches }) => {
  if (!matches || matches.length === 0) {
    return <p>No match results available.</p>;
  }

  return (
    <div>
      <h2>Match Results</h2>
      {matches.map((week, index) => (
        <div key={index}>
          <h3>Week {week.week}</h3>
          {week.matches && week.matches.length > 0 ? (
            week.matches.map((match, matchIndex) => (
              <div key={matchIndex}>
                <p>
                  {match.teamA.name} {match.teamA.score} - {match.teamB.score} {match.teamB.name}
                </p>
                <p>Goals:</p>
                <ul>
                  {match.teamA.goals.map((goal, goalIndex) => (
                    <li key={goalIndex}>{goal} (Team A)</li>
                  ))}
                  {match.teamB.goals.map((goal, goalIndex) => (
                    <li key={goalIndex}>{goal} (Team B)</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>No matches this week.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default MatchResults;