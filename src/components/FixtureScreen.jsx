import React from 'react';

const FixtureScreen = ({ teams, onGenerateFixture, fixture, onStartMatches }) => {
  return (
    <div>
      <h1>Generate Fixture</h1>
      <button onClick={() => onGenerateFixture(teams)}>Generate Fixture</button>
      {fixture && fixture.length > 0 && (
        <div>
          <h2>Fixture</h2>
          {fixture.map((week, index) => (
            <div key={index}>
              <h3>Week {week.week}</h3>
              {week.matches.map((match, matchIndex) => (
                <p key={matchIndex}>
                  {match.home.name} vs {match.away.name}
                </p>
              ))}
            </div>
          ))}
          <button onClick={onStartMatches}>Start Matches</button>
        </div>
      )}
    </div>
  );
};

export default FixtureScreen;