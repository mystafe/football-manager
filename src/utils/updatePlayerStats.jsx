export const updatePlayerStats = (playerStats, matchResult) => {
  const { home, away } = matchResult;

  const updateGoals = (team, isHome) => {
    if (team && team.goals && Array.isArray(team.goals)) {
      team.goals.forEach(goalScorer => {
        const player = playerStats.find(p => p.name === goalScorer);
        if (player) {
          player.goals += 1;
          player.strengthChange = (player.strengthChange || 0) + 3; // Gol atan oyuncunun gücü artar
        }
      });

      if (team.players && Array.isArray(team.players)) {
        team.players.forEach(p => {
          if (p.position === 'DEF' || p.position === 'GK') {
            const player = playerStats.find(player => player.name === p.name);
            if (player) {
              if (isHome) {
                player.strengthChange = (player.strengthChange || 0) + 1;
              } else {
                player.strengthChange = (player.strengthChange || 0) - 1;
              }
            }
          }
        });
      }
    }
  };

  updateGoals(home, true);
  updateGoals(away, false);

  return playerStats.map(player => {
    // Gol atamayan oyuncuların güçleri azalır
    if (
      !(home.goals && home.goals.includes(player.name)) &&
      !(away.goals && away.goals.includes(player.name))
    ) {
      player.strengthChange = (player.strengthChange || 0) - 1;
    }
    return player;
  });
};