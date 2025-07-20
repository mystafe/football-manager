import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const TeamTable = ({ table }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Team</TableCell>
          <TableCell align="right">P</TableCell>
          <TableCell align="right">W</TableCell>
          <TableCell align="right">D</TableCell>
          <TableCell align="right">L</TableCell>
          <TableCell align="right">GF</TableCell>
          <TableCell align="right">GA</TableCell>
          <TableCell align="right">GD</TableCell>
          <TableCell align="right">Pts</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {table.map((team, index) => (
          <TableRow key={index}>
            <TableCell component="th" scope="row">{team.name}</TableCell>
            <TableCell align="right">{team.played}</TableCell>
            <TableCell align="right">{team.won}</TableCell>
            <TableCell align="right">{team.drawn}</TableCell>
            <TableCell align="right">{team.lost}</TableCell>
            <TableCell align="right">{team.goalsFor}</TableCell>
            <TableCell align="right">{team.goalsAgainst}</TableCell>
            <TableCell align="right">{team.goalsFor - team.goalsAgainst}</TableCell>
            <TableCell align="right">{team.points}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default TeamTable;