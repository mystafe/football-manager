export const calculatePlayerStrength = (player) => {
  switch (player.position) {
    case 'GK':
      return player.goalkeeping * 0.85 + player.defense * 0.15;
    case 'DEF':
      return player.defense * 0.7 + player.attack * 0.3;
    case 'MID':
      return player.attack * 0.65 + player.defense * 0.35;
    case 'FWD':
      return player.attack * 0.85 + player.defense * 0.15;
    default:
      return 0;
  }
};