import { calculateTeamStrength } from './calculateTeamStrength';

export const initializeTable = (teams) => {
  const table = teams.map(team => {
    const strength = calculateTeamStrength({ name: team.name, players: team.players }) || 0;
    return {
      name: team.name,
      strength: strength,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      points: 0
    };
  });
  // console.log("Initialized Table:", table); // Konsola yazdır
  return table;
};