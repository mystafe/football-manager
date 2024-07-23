import { calculateTeamStrength } from './calculateTeamStrength';

export const initializeTable = (teams) => {
  return teams.map(team => ({
    name: team.name,
    players: team.players, // Include players array here
    strength: calculateTeamStrength(team),
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    points: 0,
  }));
};