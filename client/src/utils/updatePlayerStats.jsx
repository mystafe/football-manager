import { calculatePlayerStrength } from './calculatePlayerStrength';

const updateStats = (players, homeScore, awayScore, isHome) => {
  if (!players || !Array.isArray(players)) {
    console.error('Players array is undefined or not an array:', players);
    return;
  }

  players.forEach(player => {
    player.goalkeepingChange = 0;
    player.defenseChange = 0;
    player.midfieldChange = 0;
    player.attackChange = 0;

    // Update based on match outcome
    if ((isHome && homeScore > awayScore) || (!isHome && awayScore > homeScore)) {
      if (player.position === 'GK') {
        player.goalkeepingChange += 1;
      } else if (player.position === 'DEF') {
        player.defenseChange += 1;
      } else if (player.position === 'MID') {
        player.attackChange += 1;
      } else if (player.position === 'FWD') {
        player.attackChange += 1;
      }
    } else if ((isHome && homeScore < awayScore) || (!isHome && awayScore < homeScore)) {
      if (player.position === 'GK') {
        player.goalkeepingChange -= 1;
      } else if (player.position === 'DEF') {
        player.defenseChange -= 1;
      } else if (player.position === 'MID') {
        player.attackChange -= 1;
      } else if (player.position === 'FWD') {
        player.attackChange -= 1;
      }
    }

    // Update based on goals conceded
    if ((isHome && awayScore > 0) || (!isHome && homeScore > 0)) {
      if (player.position === 'GK') {
        player.goalkeepingChange -= 2;
        player.defenseChange -= 1;
      } else if (player.position === 'DEF') {
        player.defenseChange -= 2;
      } else if (player.position === 'MID') {
        player.defenseChange -= 1;
      }
    } else {
      if (player.position === 'GK') {
        player.goalkeepingChange += 3;
        player.defenseChange += 1;
      } else if (player.position === 'DEF') {
        player.defenseChange += 3;
      } else if (player.position === 'MID') {
        player.defenseChange += 1;
      }
    }

    // Update based on goals scored
    if ((isHome && homeScore > 0) || (!isHome && awayScore > 0)) {
      if (player.position === 'DEF') {
        player.attackChange += 1;
      } else if (player.position === 'MID') {
        player.attackChange += 1;
      } else if (player.position === 'FWD') {
        player.attackChange += 2;
      }
    } else {
      if (player.position === 'MID') {
        player.attackChange -= 1;
      } else if (player.position === 'FWD') {
        player.attackChange -= 2;
      }
    }

    // Update player strength
    player.goalkeeping += player.goalkeepingChange;
    player.defense += player.defenseChange;
    player.midfield += player.midfieldChange;
    player.attack += player.attackChange;
    player.strength = calculatePlayerStrength(player);
  });
};

export const updatePlayerStatsAfterMatch = (home, away, homeScore, awayScore) => {
  updateStats(home.players, homeScore, awayScore, true);
  updateStats(away.players, homeScore, awayScore, false);
};