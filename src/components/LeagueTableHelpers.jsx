import React from 'react';

export const Fixture = ({ matches, handleStartMatches }) => (
  <div>
    <h2>Fixture</h2>
    {matches.map((week, index) => (
      <div key={index}>
        <h3>Week {week.week}</h3>
        {week.matches.map((match, matchIndex) => (
          <p key={matchIndex}>
            {match.home.name} vs {match.away.name}
          </p>
        ))}
      </div>
    ))}
    <StartMatchesButton handleStartMatches={handleStartMatches} />
  </div>
);

export const StartMatchesButton = ({ handleStartMatches }) => (
  <button onClick={handleStartMatches}>Start Matches</button>
);

export const NextWeekButton = ({ handleNextWeek, seasonEnded }) => (
  <button onClick={handleNextWeek} disabled={seasonEnded}>Next Week</button>
);