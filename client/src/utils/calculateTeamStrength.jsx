import { calculatePlayerStrength } from './calculatePlayerStrength';

export const calculateTeamStrength = (team) => {
  if (!team.players || team.players.length === 0) {
    console.log(`Team ${team.name} has no players or players array is empty`);
    return 0;
  }

  const positions = {
    GK: [],
    DEF: [],
    MID: [],
    FWD: []
  };

  team.players.forEach(player => {
    const playerStrength = calculatePlayerStrength(player);
    if (positions[player.position]) {
      positions[player.position].push(playerStrength);
    }
  });

  const getTopNPlayers = (players, n) => {
    return players.sort((a, b) => b - a).slice(0, n);
  };

  const topGK = getTopNPlayers(positions.GK, 1);
  const topDEF = getTopNPlayers(positions.DEF, 4);
  const topMID = getTopNPlayers(positions.MID, 4);
  const topFWD = getTopNPlayers(positions.FWD, 2);

  const allTopPlayers = [...topGK, ...topDEF, ...topMID, ...topFWD];

  const totalStrength = allTopPlayers.reduce((sum, strength) => sum + strength, 0);
  const teamStrength = totalStrength / allTopPlayers.length;

  console.log(`Team: ${team.name}, Strength: ${teamStrength}`);
  return teamStrength;
};