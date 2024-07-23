import { calculatePlayerStrength } from './calculatePlayerStrength';

export const calculateTeamStrength = (team) => {
  if (!team.players || team.players.length === 0) {
    console.log(`Team ${team.name} has no players or players array is empty`);
    return 0;
  }

  const totalStrength = team.players.reduce((sum, player) => {
    const playerStrength = calculatePlayerStrength(player);
    console.log(`Player: ${player.name}, Strength: ${playerStrength}`);
    return sum + playerStrength;
  }, 0);

  const teamStrength = totalStrength / team.players.length;
  console.log(`Team: ${team.name}, Strength: ${teamStrength}`);
  return teamStrength;
};

export const initializePlayerStats = (teams) => {
  const playerStats = [];
  teams.forEach((team) => {
    if (team.players && Array.isArray(team.players)) {
      team.players.forEach((player) => {
        playerStats.push({
          name: player.name,
          team: team.name,
          position: player.position,
          strength: player.strength,
          goals: player.goals || 0,
          strengthChange: 0,
        });
      });
    }
  });
  return playerStats;
};

export const initializeTable = (teams) => {
  return teams.map(team => ({
    name: team.name,
    strength: calculateTeamStrength(team),
    players: team.players, // Include players
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    points: 0,
  }));
};

export const simulateMatch = (home, away, isHomeTeamA = true) => {
  if (!home || !home.players || !Array.isArray(home.players)) {
    console.error('Home team or players are undefined or not an array:', home);
    return null;
  }

  if (!away || !away.players || !Array.isArray(away.players)) {
    console.error('Away team or players are undefined or not an array:', away);
    return null;
  }

  const homeStrength = calculateTeamStrength(home) || 0;
  const awayStrength = calculateTeamStrength(away) || 0;

  console.log(`Home Team: ${home.name}, Strength: ${homeStrength}`);
  console.log(`Away Team: ${away.name}, Strength: ${awayStrength}`);

  const totalStrength = homeStrength + awayStrength;

  const homeAdvantage = isHomeTeamA ? 0.1 : -0.1;
  const strengthAdvantage = ((homeStrength - awayStrength) / totalStrength) * 0.2 || 0;

  const homeWinProbability = (homeStrength / totalStrength) + homeAdvantage + strengthAdvantage || 0.5;

  console.log(`Home Win Probability: ${homeWinProbability}`);

  const randomValue = Math.random();
  let homeScore = 0;
  let awayScore = 0;

  if (randomValue < homeWinProbability) {
    homeScore = Math.floor(Math.random() * 4) + 1;
    awayScore = Math.floor(Math.random() * 3);
  } else {
    homeScore = Math.floor(Math.random() * 3);
    awayScore = Math.floor(Math.random() * 4) + 1;
  }

  const homeGoals = [];
  const awayGoals = [];

  if (home.players && Array.isArray(home.players)) {
    for (let i = 0; i < homeScore; i++) {
      const randomPlayer = home.players[Math.floor(Math.random() * home.players.length)];
      homeGoals.push(randomPlayer.name);
    }
  }

  if (away.players && Array.isArray(away.players)) {
    for (let i = 0; i < awayScore; i++) {
      const randomPlayer = away.players[Math.floor(Math.random() * away.players.length)];
      awayGoals.push(randomPlayer.name);
    }
  }

  updatePlayerStatsAfterMatch(home, away, homeScore, awayScore);

  return {
    home: {
      name: home.name,
      score: homeScore,
      goals: homeGoals,
    },
    away: {
      name: away.name,
      score: awayScore,
      goals: awayGoals,
    },
  };
};

export const updatePlayerStatsAfterMatch = (home, away, homeScore, awayScore) => {
  if (!home.players || !Array.isArray(home.players)) {
    console.error('Home team or players are undefined or not an array:', home.players);
    return;
  }

  if (!away.players || !Array.isArray(away.players)) {
    console.error('Away team or players are undefined or not an array:', away.players);
    return;
  }

  const updateStats = (team, score, opponentScore) => {
    team.players.forEach(player => {
      if (score === 0) {
        if (player.position === 'FWD') {
          player.attack -= 2;
        } else if (player.position === 'MID') {
          player.attack -= 1;
        }
      }

      if (opponentScore === 0) {
        if (player.position === 'GK') {
          player.goalkeeping += 3;
          player.defense += 1;
        } else if (player.position === 'DEF') {
          player.defense += 3;
        } else if (player.position === 'MID') {
          player.defense += 1;
        }
      } else {
        if (player.position === 'GK') {
          player.goalkeeping -= 2;
          player.defense -= 1;
        } else if (player.position === 'DEF') {
          player.defense -= 2;
        } else if (player.position === 'MID') {
          player.defense -= 1;
        }
      }

      if (score > 0) {
        if (player.position === 'DEF') {
          player.attack += 1;
        } else if (player.position === 'MID') {
          player.attack += 1;
        } else if (player.position === 'FWD') {
          player.attack += 2;
        }
      }

      if (score > opponentScore) {
        if (player.position === 'GK') {
          player.goalkeeping += 1;
        } else if (player.position === 'DEF') {
          player.defense += 1;
        } else if (player.position === 'MID') {
          player.attack += 1;
        } else if (player.position === 'FWD') {
          player.attack += 1;
        }
      } else if (score < opponentScore) {
        if (player.position === 'GK') {
          player.goalkeeping -= 1;
        } else if (player.position === 'DEF') {
          player.defense -= 1;
        } else if (player.position === 'MID') {
          player.attack -= 1;
        } else if (player.position === 'FWD') {
          player.attack -= 1;
        }
      }

      player.strength = calculatePlayerStrength(player);
    });
  };

  updateStats(home, homeScore, awayScore);
  updateStats(away, awayScore, homeScore);
};

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

export const generateFixture = (teams) => {
  const fixtures = [];
  const teamCount = teams.length;

  for (let round = 0; round < teamCount - 1; round++) {
    const roundFixtures = [];
    for (let match = 0; match < teamCount / 2; match++) {
      const home = teams[match];
      const away = teams[teamCount - 1 - match];
      roundFixtures.push({ home, away });
      }
      teams.splice(1, 0, teams.pop());
      fixtures.push({ week: round + 1, matches: roundFixtures });
      }
      
      return fixtures;
      };
      
      export const determineTopScorer = (matches) => {
      let playerGoals = {};
      
      matches.forEach(week => {
      week.matches.forEach(match => {
      match.home.goals.forEach(player => {
      playerGoals[player] = (playerGoals[player] || 0) + 1;
      });
      match.away.goals.forEach(player => {
      playerGoals[player] = (playerGoals[player] || 0) + 1;
      });
      });
      });
      
      let topScorer = { name: "", goals: 0 };
      
      for (const player in playerGoals) {
      if (playerGoals[player] > topScorer.goals) {
      topScorer = { name: player, goals: playerGoals[player] };
      }
      }
      
      return topScorer;
      };