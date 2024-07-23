import React from 'react';
import { Button, Container, Box, Typography, Paper } from '@mui/material';
import { GenerateFixtureButton } from './LeagueTableHelpers';

const FixtureScreen = ({ teams, onGenerateFixture, fixture, onStartMatches }) => {
  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h5" component="h2" align="center">Generate Fixture</Typography>
        <GenerateFixtureButton handleGenerateFixture={() => onGenerateFixture(teams)} />
        {fixture.length > 0 && (
          <Box mt={4}>
            <Typography variant="h6" component="h3">Fixture Generated</Typography>
            <Paper style={{ padding: '10px' }}>
              {fixture.map((week, index) => (
                <div key={index}>
                  <Typography variant="subtitle1">Week {index + 1}</Typography>
                  <ul>
                    {week.matches.map((match, matchIndex) => (
                      <li key={matchIndex}>
                        {match.home.name} vs {match.away.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <Button variant="contained" color="primary" onClick={onStartMatches} style={{ marginTop: '20px' }}>
                Start Matches
              </Button>
            </Paper>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default FixtureScreen;