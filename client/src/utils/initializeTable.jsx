import { calculateTeamStrength } from './calculateTeamStrength';

export const initializeTable = (teams) => {
  return teams.map(team => ({
    name: team.name,
    strength: calculateTeamStrength(team),
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    points: 0,
    players: team.players // Ensure players are included
  }));
};

export const initializePlayerStats = (teams) => {
  const playerStats = [];
  teams.forEach(team => {
    team.players.forEach(player => {
      playerStats.push({
        name: player.name,
        team: team.name,
        position: player.position,
        strength: player.strength,
        goals: player.goals || 0,
        strengthChange: 0
      });
    });
  });
  return playerStats;
};