import { calculateTeamStrength } from './calculateTeamStrength';

export const updateTable = (table, result, playerStats) => {
  const updatedTable = table.map(team => {
    if (team.name === result.teamA.name) {
      const updatedTeamAPlayers = playerStats.filter(p => p.team === team.name);
      const updatedTeamAStrength = calculateTeamStrength({ players: updatedTeamAPlayers }) || 0;

      return {
        ...team,
        strength: updatedTeamAStrength,
        played: team.played + 1,
        goalsFor: team.goalsFor + result.teamA.score,
        goalsAgainst: team.goalsAgainst + result.teamB.score,
        won: team.won + (result.teamA.score > result.teamB.score ? 1 : 0),
        drawn: team.drawn + (result.teamA.score === result.teamB.score ? 1 : 0),
        lost: team.lost + (result.teamA.score < result.teamB.score ? 1 : 0),
        points: team.points + (result.teamA.score > result.teamB.score ? 3 : result.teamA.score === result.teamB.score ? 1 : 0)
      };
    } else if (team.name === result.teamB.name) {
      const updatedTeamBPlayers = playerStats.filter(p => p.team === team.name);
      const updatedTeamBStrength = calculateTeamStrength({ players: updatedTeamBPlayers }) || 0;

      return {
        ...team,
        strength: updatedTeamBStrength,
        played: team.played + 1,
        goalsFor: team.goalsFor + result.teamB.score,
        goalsAgainst: team.goalsAgainst + result.teamA.score,
        won: team.won + (result.teamB.score > result.teamA.score ? 1 : 0),
        drawn: team.drawn + (result.teamB.score === result.teamA.score ? 1 : 0),
        lost: team.lost + (result.teamB.score < result.teamA.score ? 1 : 0),
        points: team.points + (result.teamB.score > result.teamA.score ? 3 : result.teamB.score === result.teamA.score ? 1 : 0)
      };
    }
    return team;
  });

  return updatedTable;
};