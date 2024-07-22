import { calculateTeamStrength } from './calculateTeamStrength';

export const updateTable = (table, result, playerStats) => {
  if (!result || !result.home || !result.away) {
    console.error('Invalid match result:', result);
    return table;
  }

  const updatedTable = table.map(team => {
    if (team.name === result.home.name) {
      team.played += 1;
      team.goalsFor += result.home.score;
      team.goalsAgainst += result.away.score;
      if (result.home.score > result.away.score) {
        team.won += 1;
        team.points += 3;
      } else if (result.home.score < result.away.score) {
        team.lost += 1;
      } else {
        team.drawn += 1;
        team.points += 1;
      }
    } else if (team.name === result.away.name) {
      team.played += 1;
      team.goalsFor += result.away.score;
      team.goalsAgainst += result.home.score;
      if (result.away.score > result.home.score) {
        team.won += 1;
        team.points += 3;
      } else if (result.away.score < result.home.score) {
        team.lost += 1;
      } else {
        team.drawn += 1;
        team.points += 1;
      }
    }
    team.strength = calculateTeamStrength(team, playerStats);
    return team;
  });

  return updatedTable;
};