export const calculateTeamStrength = (team) => {
  if (!team.players || team.players.length === 0) {
    return 0;
  }

  const totalStrength = team.players.reduce((total, player) => {
    const playerStrength = player.strength || 0;
    return total + playerStrength;
  }, 0);

  const averageStrength = totalStrength / team.players.length;
  return isNaN(averageStrength) ? 0 : averageStrength;
};