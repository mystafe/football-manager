import { calculateTeamStrength } from './calculateTeamStrength';

export const simulateMatch = (teamA, teamB) => {
  const teamAStrength = calculateTeamStrength(teamA);
  const teamBStrength = calculateTeamStrength(teamB);

  const totalStrength = teamAStrength + teamBStrength;
  const teamAWinProbability = teamAStrength / totalStrength;

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