import React from 'react';
import './LeagueTableHelpers.css';

export const Fixture = ({ matches, handleStartMatches }) => (
  <div className="fixtures">
    <h2>Fixture</h2>
    <ul className="fixtures-list">
      {matches.map((week, index) => (
        <li key={index}>
          <h3>Week {week.week}</h3>
          <ul>
            {week.matches.map((match, i) => (
              <li key={i}>
                {match.home.name} vs {match.away.name}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
    <button onClick={handleStartMatches}>Start Matches</button>
  </div>
);

export const NextWeekButton = ({ handleNextWeek, seasonEnded }) => (
  <button onClick={handleNextWeek} disabled={seasonEnded}>
    {seasonEnded ? 'Season Ended' : 'Next Week'}
  </button>
);

export const GenerateFixtureButton = ({ handleGenerateFixture, teams }) => (
  <button onClick={() => handleGenerateFixture(teams)}>Generate Fixture</button>
);