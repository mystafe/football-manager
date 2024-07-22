export const generateFixture = (teams) => {
  const totalTeams = teams.length;
  const fixture = [];
  const rounds = [];

  // Eğer takım sayısı tek ise bay takımı ekle
  if (totalTeams % 2 !== 0) {
    teams.push({ name: "BYE" });
  }

  const numRounds = (teams.length - 1) * 2;

  for (let round = 0; round < numRounds; round++) {
    const matches = [];
    const isSecondHalf = round >= teams.length - 1;

    for (let i = 0; i < teams.length / 2; i++) {
      const home = teams[i];
      const away = teams[teams.length - 1 - i];

      if (home.name !== "BYE" && away.name !== "BYE") {
        matches.push({
          home: isSecondHalf ? away : home,
          away: isSecondHalf ? home : away,
        });
      }
    }

    fixture.push({
      week: round + 1,
      matches,
    });

    // Rotate teams for the next round
    teams.splice(1, 0, teams.pop());
  }

  return fixture;
};