import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Box, Paper } from '@mui/material';

const TeamList = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/teams`)
      .then(response => {
        setTeams(response.data);
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
      });
  }, []);

  return (
    <Box mt={4}>
      <Typography variant="h6" component="h2" align="center">Teams</Typography>
      <Paper style={{ marginTop: '20px', padding: '10px' }}>
        <List>
          {teams.map(team => (
            <ListItem key={team.id}>
              <ListItemText primary={team.name} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default TeamList;