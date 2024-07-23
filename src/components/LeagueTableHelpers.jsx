import React from 'react';
import { Button } from '@mui/material';

export const StartMatchesButton = ({ handleStartMatches }) => (
  <Button variant="contained" color="primary" onClick={handleStartMatches}>
    Start Matches
  </Button>
);

export const NextWeekButton = ({ handleNextWeek, seasonEnded }) => (
  <Button 
    variant="contained" 
    color="secondary" 
    onClick={handleNextWeek} 
    disabled={seasonEnded}
  >
    {seasonEnded ? 'Season Ended' : 'Next Week'}
  </Button>
);

export const GenerateFixtureButton = ({ handleGenerateFixture }) => (
  <Button 
    variant="contained" 
    color="primary" 
    onClick={handleGenerateFixture} 
    style={{ marginTop: '20px' }}
  >
    Generate Fixture
  </Button>
);

export const ResetSeasonButton = ({ handleReset }) => (
  <Button 
    variant="contained" 
    color="default" 
    onClick={handleReset} 
    style={{ marginTop: '20px' }}
  >
    Reset Season
  </Button>
);

export const Fixture = ({ matches, handleStartMatches }) => (
  <div>
    <h2>Fixture</h2>
    {matches.map((week, index) => (
      <div key={index}>
        <h3>Week {index + 1}</h3>
        <ul>
          {week.matches.map((match, matchIndex) => (
            <li key={matchIndex}>
              {match.home.name} vs {match.away.name}
            </li>
          ))}
        </ul>
      </div>
    ))}
    <StartMatchesButton handleStartMatches={handleStartMatches} />
  </div>
);