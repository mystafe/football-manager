import { calculatePlayerStrength } from './calculatePlayerStrength';

export const updatePlayerStats = (playerStats, result) => {
  const updatedStats = playerStats.map(player => {
    const newPlayer = { ...player };
    if (isNaN(newPlayer.strength)) {
      newPlayer.strength = 0; // Eğer oyuncu gücü NaN ise, sıfır olarak ayarla
    }
    return newPlayer;
  });

  // Gol atan oyuncuların güçlerini güncelle
  if (result.teamA.goals) {
    result.teamA.goals.forEach(goalScorer => {
      const player = updatedStats.find(p => p.name === goalScorer);
      if (player) {
        player.goals += 1;
        player.strength += 3;
        player.strengthChange += 3;
      }
    });
  }

  if (result.teamB.goals) {
    result.teamB.goals.forEach(goalScorer => {
      const player = updatedStats.find(p => p.name === goalScorer);
      if (player) {
        player.goals += 1;
        player.strength += 3;
        player.strengthChange += 3;
      }
    });
  }

  // Gol atamayan oyuncuların güçlerini güncelle
  updatedStats.forEach(player => {
    if (
      (!result.teamA.goals || !result.teamA.goals.includes(player.name)) &&
      (!result.teamB.goals || !result.teamB.goals.includes(player.name))
    ) {
      player.strength -= 1;
      player.strengthChange -= 1;
    }
  });

  // Takımın gol yememe ve yeme durumuna göre güç güncellemesi
  if (result.teamB.score === 0 && result.teamA.players) {
    result.teamA.players.forEach(playerName => {
      const player = updatedStats.find(p => p.name === playerName);
      if (player) {
        if (player.position === 'DEF') {
          player.strength += 1;
          player.strengthChange += 1;
        } else if (player.position === 'GK') {
          player.strength += 3;
          player.strengthChange += 3;
        }
      }
    });
  } else if (result.teamA.players) {
    result.teamA.players.forEach(playerName => {
      const player = updatedStats.find(p => p.name === playerName);
      if (player) {
        if (player.position === 'DEF') {
          player.strength -= 1;
          player.strengthChange -= 1;
        } else if (player.position === 'GK') {
          player.strength -= 1;
          player.strengthChange -= 1;
        }
      }
    });
  }

  if (result.teamA.score === 0 && result.teamB.players) {
    result.teamB.players.forEach(playerName => {
      const player = updatedStats.find(p => p.name === playerName);
      if (player) {
        if (player.position === 'DEF') {
          player.strength += 1;
          player.strengthChange += 1;
        } else if (player.position === 'GK') {
          player.strength += 3;
          player.strengthChange += 3;
        }
      }
    });
  } else if (result.teamB.players) {
    result.teamB.players.forEach(playerName => {
      const player = updatedStats.find(p => p.name === playerName);
      if (player) {
        if (player.position === 'DEF') {
          player.strength -= 1;
          player.strengthChange -= 1;
        } else if (player.position === 'GK') {
          player.strength -= 1;
          player.strengthChange -= 1;
        }
      }
    });
  }

  return updatedStats;
};