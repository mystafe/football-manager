import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';

const MatchResults = ({ matches }) => (
  <Box mt={4}>
    <Typography variant="h6" component="h2" align="center">Match Results</Typography>
    <TableContainer component={Paper} style={{ marginTop: '20px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Week</TableCell>
            <TableCell>Home Team</TableCell>
            <TableCell>Away Team</TableCell>
            <TableCell>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {matches.map((week, index) => (
            <React.Fragment key={index}>
              {week.matches.map((match, matchIndex) => (
                <TableRow key={matchIndex}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{match.home.name}</TableCell>
                  <TableCell>{match.away.name}</TableCell>
                  <TableCell>{match.home.score} - {match.away.score}</TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

export default MatchResults;