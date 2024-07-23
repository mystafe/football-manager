import { calculateTeamStrength } from './calculateTeamStrength';

export const simulateMatch = (home, away, isHomeTeamA = true) => {
  const homeStrength = calculateTeamStrength(home) || 0;
  const awayStrength = calculateTeamStrength(away) || 0;

  console.log(`Home Team: ${home.name}, Strength: ${homeStrength}`);
  console.log(`Away Team: ${away.name}, Strength: ${awayStrength}`);

  const totalStrength = homeStrength + awayStrength;

  const homeAdvantage = isHomeTeamA ? 0.1 : -0.1;
  const strengthAdvantage = ((homeStrength - awayStrength) / totalStrength) * 0.2 || 0;

  const homeWinProbability = (homeStrength / totalStrength) + homeAdvantage + strengthAdvantage || 0.5;

  console.log(`Home Win Probability: ${homeWinProbability}`);

  const randomValue = Math.random();
  let homeScore = 0;
  let awayScore = 0;

  if (randomValue < homeWinProbability) {
    homeScore = Math.floor(Math.random() * 4) + 1;
    awayScore = Math.floor(Math.random() * 3);
  } else {
    homeScore = Math.floor(Math.random() * 3);
    awayScore = Math.floor(Math.random() * 4) + 1;
  }

  const homeGoals = [];
  const awayGoals = [];

  if (home.players && Array.isArray(home.players)) {
    for (let i = 0; i < homeScore; i++) {
      const randomPlayer = home.players[Math.floor(Math.random() * home.players.length)];
      homeGoals.push(randomPlayer.name);
    }
  }

  if (away.players && Array.isArray(away.players)) {
    for (let i = 0; i < awayScore; i++) {
      const randomPlayer = away.players[Math.floor(Math.random() * away.players.length)];
      awayGoals.push(randomPlayer.name);
    }
  }

  return {
    home: {
      name: home.name,
      score: homeScore,
      goals: homeGoals
    },
    away: {
      name: away.name,
      score: awayScore,
      goals: awayGoals
    }
  };
};