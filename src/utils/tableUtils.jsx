import { calculatePlayerStrength } from './calculatePlayerStrength';
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
    points: 0
  }));
};

export const initializePlayerStats = (teams) => {
  return teams.flatMap(team =>
    team.players.map(player => ({
      name: player.name,
      team: team.name,
      position: player.position,
      strength: calculatePlayerStrength(player),
      goals: 0
    }))
  );
};

export const updateTable = (table, result) => {
  return table.map(team => {
    if (team.name === result.teamA.name) {
      return {
        ...team,
        played: team.played + 1,
        goalsFor: team.goalsFor + result.teamA.score,
        goalsAgainst: team.goalsAgainst + result.teamB.score,
        won: team.won + (result.teamA.score > result.teamB.score ? 1 : 0),
        drawn: team.drawn + (result.teamA.score === result.teamB.score ? 1 : 0),
        lost: team.lost + (result.teamA.score < result.teamB.score ? 1 : 0),
        points: team.points + (result.teamA.score > result.teamB.score ? 3 : result.teamA.score === result.teamB.score ? 1 : 0)
      };
    } else if (team.name === result.teamB.name) {
      return {
        ...team,
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
};

export const updatePlayerStats = (playerStats, result) => {
  const updatedStats = playerStats.map(player => ({ ...player }));

  result.teamA.goals.forEach(goalScorer => {
    const player = updatedStats.find(p => p.name === goalScorer);
    if (player) {
      player.goals += 1;
    }
  });

  result.teamB.goals.forEach(goalScorer => {
    const player = updatedStats.find(p => p.name === goalScorer);
    if (player) {
      player.goals += 1;
    }
  });

  return updatedStats;
};

export const determineTopScorer = (allMatches) => {
  const playerGoals = {};
  allMatches.forEach(week => {
    week.matches.forEach(match => {
      match.teamA.goals.forEach(player => {
        if (playerGoals[player]) {
          playerGoals[player] += 1;
        } else {
          playerGoals[player] = 1;
        }
      });
      match.teamB.goals.forEach(player => {
        if (playerGoals[player]) {
          playerGoals[player] += 1;
        } else {
          playerGoals[player] = 1;
        }
      });
    });
  });

  return Object.keys(playerGoals).reduce((a, b) => playerGoals[a] > playerGoals[b] ? a : b);
};