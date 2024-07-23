export const determineTopScorer = (matches) => {
  const playerGoals = {};

  matches.forEach(week => {
    week.matches.forEach(match => {
      match.home.goals.forEach(playerName => {
        if (!playerGoals[playerName]) {
          playerGoals[playerName] = 0;
        }
        playerGoals[playerName] += 1;
      });

      match.away.goals.forEach(playerName => {
        if (!playerGoals[playerName]) {
          playerGoals[playerName] = 0;
        }
        playerGoals[playerName] += 1;
      });
    });
  });

  let topScorer = null;
  let maxGoals = 0;

  for (const playerName in playerGoals) {
    if (playerGoals[playerName] > maxGoals) {
      maxGoals = playerGoals[playerName];
      topScorer = { name: playerName, goals: maxGoals };
    }
  }

  return topScorer;
};