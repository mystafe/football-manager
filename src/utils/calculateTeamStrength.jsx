import { calculatePlayerStrength } from './calculatePlayerStrength';

export const calculateTeamStrength = (team) => {
  if (!team.players || team.players.length === 0) {
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