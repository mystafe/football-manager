import { calculatePlayerStrength } from './calculatePlayerStrength';

export const calculateTeamStrength = (team) => {
  if (!team.players || team.players.length === 0) {
    return 0;
  }

  const totalStrength = team.players.reduce((sum, player) => sum + calculatePlayerStrength(player), 0);
  return totalStrength / team.players.length;
};