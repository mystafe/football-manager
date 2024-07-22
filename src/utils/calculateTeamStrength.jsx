import { calculatePlayerStrength } from './calculatePlayerStrength';

export const calculateTeamStrength = (team) => {
  const totalStrength = team.players.reduce((sum, player) => {
    return sum + calculatePlayerStrength(player);
  }, 0);
  return totalStrength / team.players.length;
};