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
                {match.home && match.away ? (
                  <>
                    <p>
                      {match.home.name} {match.home.score !== undefined ? match.home.score : '-'} - {match.away.score !== undefined ? match.away.score : '-'} {match.away.name}
                    </p>
                    <p>Goals:</p>
                    <ul>
                      {match.home.goals && match.home.goals.length > 0 ? (
                        match.home.goals.map((goal, goalIndex) => (
                          <li key={goalIndex}>{goal} (Home)</li>
                        ))
                      ) : (
                        <li>No goals for {match.home.name}</li>
                      )}
                      {match.away.goals && match.away.goals.length > 0 ? (
                        match.away.goals.map((goal, goalIndex) => (
                          <li key={goalIndex}>{goal} (Away)</li>
                        ))
                      ) : (
                        <li>No goals for {match.away.name}</li>
                      )}
                    </ul>
                  </>
                ) : (
                  <p>Invalid match data.</p>
                )}
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