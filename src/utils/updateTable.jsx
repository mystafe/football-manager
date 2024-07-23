import { calculateTeamStrength } from './calculateTeamStrength';

export const updateTable = (table, result) => {
  if (!result || !result.home || !result.away) {
    console.error('Invalid match result:', result);
    return table;
  }

  const updatedTable = table.map(team => {
    let newTeam = { ...team };
    if (team.name === result.home.name) {
      newTeam = {
        ...team,
        played: team.played + 1,
        goalsFor: team.goalsFor + result.home.score,
        goalsAgainst: team.goalsAgainst + result.away.score,
        won: team.won + (result.home.score > result.away.score ? 1 : 0),
        drawn: team.drawn + (result.home.score === result.away.score ? 1 : 0),
        lost: team.lost + (result.home.score < result.away.score ? 1 : 0),
        points: team.points + (result.home.score > result.away.score ? 3 : (result.home.score === result.away.score ? 1 : 0)),
      };
    } else if (team.name === result.away.name) {
      newTeam = {
        ...team,
        played: team.played + 1,
        goalsFor: team.goalsFor + result.away.score,
        goalsAgainst: team.goalsAgainst + result.home.score,
        won: team.won + (result.away.score > result.home.score ? 1 : 0),
        drawn: team.drawn + (result.away.score === result.home.score ? 1 : 0),
        lost: team.lost + (result.away.score < result.home.score ? 1 : 0),
        points: team.points + (result.away.score > result.home.score ? 3 : (result.away.score === result.home.score ? 1 : 0)),
      };
    }
    newTeam.strength = calculateTeamStrength(newTeam);
    console.log(`Updated Team: ${newTeam.name}, Strength: ${newTeam.strength}`);
    return newTeam;
  });

  return updatedTable;
};