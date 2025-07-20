const determineTopScorer = (matches) => {
  let playerGoals = {};

  matches.forEach(week => {
    week.matches.forEach(match => {
      match.home.goals.forEach(player => {
        playerGoals[player] = (playerGoals[player] || 0) + 1;
      });
      match.away.goals.forEach(player => {
        playerGoals[player] = (playerGoals[player] || 0) + 1;
      });
    });
  });

  let topScorer = { name: '', goals: 0 };

  for (const player in playerGoals) {
    if (playerGoals[player] > topScorer.goals) {
      topScorer = { name: player, goals: playerGoals[player] };
    }
  }

  return topScorer;
};

export default determineTopScorer;