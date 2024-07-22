import { calculatePlayerStrength } from './calculatePlayerStrength';

export const initializePlayerStats = (teams) => {
  const playerStats = teams.flatMap(team =>
    team.players.map(player => {
      const strength = calculatePlayerStrength(player);
      if (isNaN(strength)) {
        console.warn(`Calculated NaN strength for player: ${player.name}`);
      }
      return {
        name: player.name,
        team: team.name,
        position: player.position,
        strength: strength,
        goals: 0,
        strengthChange: 0 // Güç değişikliklerini takip etmek için
      };
    })
  );
  return playerStats;
};