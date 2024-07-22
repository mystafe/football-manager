export const calculatePlayerStrength = (player) => {
  let strength;

  switch (player.position) {
    case 'GK':
      strength = player.goalkeeping * 0.85 + player.defense * 0.15;
      break;
    case 'DEF':
      strength = player.defense * 0.7 + player.attack * 0.3;
      break;
    case 'MID':
      strength = player.attack * 0.65 + player.defense * 0.35;
      break;
    case 'FWD':
      strength = player.attack * 0.85 + player.defense * 0.15;
      break;
    default:
      strength = 0;
  }

  return isNaN(strength) ? 0 : strength;
};