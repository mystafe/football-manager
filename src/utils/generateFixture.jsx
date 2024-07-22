export const generateFixture = (teams) => {
  const totalTeams = teams.length;
  const fixture = [];

  const numRounds = (totalTeams - 1) * 2;
  const matchesPerRound = totalTeams / 2;

  for (let round = 0; round < numRounds; round++) {
    const matches = [];

    for (let i = 0; i < matchesPerRound; i++) {
      const home = teams[i];
      const away = teams[totalTeams - 1 - i];

      matches.push({
        home: (round % 2 === 0) ? home : away,
        away: (round % 2 === 0) ? away : home,
      });
    }

    fixture.push({
      week: round + 1,
      matches,
    });

    const lastTeam = teams.pop();
    teams.splice(1, 0, lastTeam);
  }

  return fixture;
};