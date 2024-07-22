import { calculateTeamStrength } from './calculateTeamStrength';

export const simulateMatch = (teamA, teamB, isHomeTeamA = true) => {
  const teamAStrength = calculateTeamStrength(teamA) || 0;
  const teamBStrength = calculateTeamStrength(teamB) || 0;

  const totalStrength = teamAStrength + teamBStrength;
  
  // Ev sahibi avantajı %10 olarak ayarlanmıştır
  const homeAdvantage = isHomeTeamA ? 0.1 : -0.1;
  
  // Güçlü takımın kazanma olasılığını daha da artırmak için güç oranı
  const strengthAdvantage = ((teamAStrength - teamBStrength) / totalStrength) * 0.2 || 0;

  const teamAWinProbability = (teamAStrength / totalStrength) + homeAdvantage + strengthAdvantage || 0.5;

  const randomValue = Math.random();
  let teamAScore = 0;
  let teamBScore = 0;

  if (randomValue < teamAWinProbability) {
    teamAScore = Math.floor(Math.random() * 4) + 1; // Team A scores 1-4 goals
    teamBScore = Math.floor(Math.random() * 3); // Team B scores 0-2 goals
  } else {
    teamAScore = Math.floor(Math.random() * 3); // Team A scores 0-2 goals
    teamBScore = Math.floor(Math.random() * 4) + 1; // Team B scores 1-4 goals
  }

  //logAll
  console.table({
    teamA: {
      name: teamA.name,
      strength: teamAStrength,
      winProbability: teamAWinProbability,
      score: teamAScore
    },
    teamB: {
      name: teamB.name,
      strength: teamBStrength,
      winProbability: 1 - teamAWinProbability,
      score: teamBScore
    }
  });
  const teamAGoals = [];
  const teamBGoals = [];

  for (let i = 0; i < teamAScore; i++) {
    const randomPlayer = teamA.players[Math.floor(Math.random() * teamA.players.length)];
    teamAGoals.push(randomPlayer.name);
  }

  for (let i = 0; i < teamBScore; i++) {
    const randomPlayer = teamB.players[Math.floor(Math.random() * teamB.players.length)];
    teamBGoals.push(randomPlayer.name);
  }

  return {
    teamA: {
      name: teamA.name,
      score: teamAScore,
      goals: teamAGoals
    },
    teamB: {
      name: teamB.name,
      score: teamBScore,
      goals: teamBGoals
    }
  };
};