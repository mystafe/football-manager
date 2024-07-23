export const initializePlayerStats = (teams) => {
  const playerStats = [];

  teams.forEach(team => {
    if (team.players && Array.isArray(team.players)) {
      team.players.forEach(player => {
        playerStats.push({
          name: player.name,
          position: player.position,
          goalkeeping: player.goalkeeping,
          defense: player.defense,
          midfield: player.midfield,
          attack: player.attack,
          strength: player.strength,
          goals: player.goals,
          team: team.name
        });
      });
    }
  });

  return playerStats;
};