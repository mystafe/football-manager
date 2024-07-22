export const determineTopScorer = (allMatches) => {
  const playerGoals = {};
  allMatches.forEach(week => {
    week.matches.forEach(match => {
      match.teamA.goals.forEach(player => {
        if (playerGoals[player]) {
          playerGoals[player] += 1;
        } else {
          playerGoals[player] = 1;
        }
      });
      match.teamB.goals.forEach(player => {
        if (playerGoals[player]) {
          playerGoals[player] += 1;
        } else {
          playerGoals[player] = 1;
        }
      });
    });
  });

  return Object.keys(playerGoals).reduce((a, b) => playerGoals[a] > playerGoals[b] ? a : b);
};