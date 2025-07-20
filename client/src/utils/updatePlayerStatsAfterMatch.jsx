import { calculatePlayerStrength } from './calculatePlayerStrength';

export const updatePlayerStatsAfterMatch = (home, away, homeScore, awayScore) => {
  if (!home || !Array.isArray(home.players)) {
    console.error('Home team or players are undefined or not an array:', home);
    return;
  }

  if (!away || !Array.isArray(away.players)) {
    console.error('Away team or players are undefined or not an array:', away);
    return;
  }

  const updateStats = (team, opponentScore, scoredGoals, won) => {
    team.players.forEach(player => {
      if (team === home) {
        if (scoredGoals > 0) {
          if (player.position === 'FWD') {
            player.attack += 2;
          } else if (player.position === 'MID') {
            player.attack += 1;
          } else if (player.position === 'DEF') {
            player.attack += 1;
          }
        } else {
          if (player.position === 'FWD') {
            player.attack -= 2;
          } else if (player.position === 'MID') {
            player.attack -= 1;
          }
        }

        if (opponentScore > 0) {
          if (player.position === 'GK') {
            player.goalkeeping -= 2;
            player.defense -= 1;
          } else if (player.position === 'DEF') {
            player.defense -= 2;
          } else if (player.position === 'MID') {
            player.defense -= 1;
          }
        } else {
          if (player.position === 'GK') {
            player.goalkeeping += 3;
            player.defense += 1;
          } else if (player.position === 'DEF') {
            player.defense += 3;
          } else if (player.position === 'MID') {
            player.defense += 1;
          }
        }

        if (won) {
          if (player.position === 'GK') {
            player.goalkeeping += 1;
          } else if (player.position === 'DEF') {
            player.defense += 1;
          } else if (player.position === 'MID' || player.position === 'FWD') {
            player.attack += 1;
          }
        } else {
          if (player.position === 'GK') {
            player.goalkeeping -= 1;
          } else if (player.position === 'DEF') {
            player.defense -= 1;
          } else if (player.position === 'MID' || player.position === 'FWD') {
            player.attack -= 1;
          }
        }

        player.strength = calculatePlayerStrength(player);
      }
    });
  };

  const homeWon = homeScore > awayScore;
  const awayWon = awayScore > homeScore;

  updateStats(home, awayScore, homeScore, homeWon);
  updateStats(away, homeScore, awayScore, awayWon);
};