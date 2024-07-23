export const initializePlayerStats = (teams) => {
  const playerStats = [];
  teams.forEach(team => {
    team.players.forEach(player => {
      playerStats.push({
        name: player.name,
        team: team.name,
        goals: 0,
        strength: player.strength || 0,
        position: player.position,
      });
    });
  });
  return playerStats;
};