import React from 'react';
import './LeagueTableHelpers.css';
import { GenerateFixtureButton } from './LeagueTableHelpers';

const FixtureScreen = ({ teams, onGenerateFixture, fixture, onStartMatches }) => (
  <div>
    <h2>Football Manager</h2>
    <div className="teams">
      {teams.map((team, index) => (
        <div key={index} className="team">
          {team.name}
        </div>
      ))}
    </div>
    <GenerateFixtureButton handleGenerateFixture={onGenerateFixture} teams={teams} />
    {fixture.length > 0 && (
      <div className="fixture">
        <h3>Fixture</h3>
        {fixture.map((week, index) => (
          <div key={index}>
            <h4>Week {week.week}</h4>
            <ul>
              {week.matches.map((match, i) => (
                <li key={i}>
                  {match.home.name} vs {match.away.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button onClick={onStartMatches}>Start Matches</button>
      </div>
    )}
  </div>
);

export default FixtureScreen;