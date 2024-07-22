import React, { useState, useEffect } from 'react';
import teamsData from '../data/teams.json';
import { simulateMatch } from '../utils/simulateMatch';
import TeamTable from './TeamTable';
import MatchResults from './MatchResults';
import SeasonSummary from './SeasonSummary';
import PlayerStats from './PlayerStats';
import FixtureScreen from './FixtureScreen';
import { initializeTable } from '../utils/initializeTable';
import { initializePlayerStats } from '../utils/initializePlayerStats';
import { updateTable } from '../utils/updateTable';
import { determineTopScorer } from '../utils/determineTopScorer';
import { updatePlayerStats } from '../utils/updatePlayerStats';
import { generateFixture } from '../utils/generateFixture';

const LeagueTable = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [matches, setMatches] = useState([]);
  const [table, setTable] = useState([]);
  const [playerStats, setPlayerStats] = useState([]);
  const [topScorer, setTopScorer] = useState(null);
  const [seasonEnded, setSeasonEnded] = useState(false);
  const [fixtureGenerated, setFixtureGenerated] = useState(false);

  useEffect(() => {
    const initialTable = initializeTable(teamsData);
    const initialPlayerStats = initializePlayerStats(teamsData);
    setTable(initialTable);
    setPlayerStats(initialPlayerStats);
  }, []);

  const handleGenerateFixture = (teams) => {
    const fixture = generateFixture(teams);
    setMatches(fixture);
    setFixtureGenerated(true);
  };

  const handleNextWeek = () => {
    if (seasonEnded) return;

    const weekMatches = matches.slice(currentWeek * (teamsData.length / 2), (currentWeek + 1) * (teamsData.length / 2));
    const results = [];

    weekMatches.forEach(match => {
      const result = simulateMatch(match.home, match.away, true);
      results.push(result);
      setPlayerStats(prevStats => {
        const updatedStats = updatePlayerStats(prevStats, result);
        setTable(prevTable => updateTable(prevTable, result, updatedStats));
        return updatedStats;
      });
    });

    setMatches(prevMatches => [
      ...prevMatches.slice(0, currentWeek),
      { week: currentWeek + 1, matches: results },
      ...prevMatches.slice(currentWeek + 1)
    ]);

    setCurrentWeek(currentWeek + 1);

    if (currentWeek + 1 >= matches.length / (teamsData.length / 2)) {
      setSeasonEnded(true);
      setTopScorer(determineTopScorer(matches));
    }
  };

  const resetSeason = () => {
    const initialTable = initializeTable(teamsData);
    const initialPlayerStats = initializePlayerStats(teamsData);
    setCurrentWeek(0);
    setMatches([]);
    setTable(initialTable);
    setPlayerStats(initialPlayerStats);
    setTopScorer(null);
    setSeasonEnded(false);
    setFixtureGenerated(false);
  };

  const sortedTable = [...table].sort((a, b) => b.points - a.points);

  return (
    <div>
      {!fixtureGenerated ? (
        <FixtureScreen teams={teamsData} onGenerateFixture={handleGenerateFixture} />
      ) : (
        <>
          <h1>League Table</h1>
          <button onClick={handleNextWeek} disabled={seasonEnded}>Next Week</button>
          {seasonEnded && (
            <SeasonSummary
              champion={sortedTable[0].name}
              relegated={sortedTable[sortedTable.length - 1].name}
              topScorer={topScorer}
              resetSeason={resetSeason}
            />
          )}
          <TeamTable table={sortedTable} />
          <MatchResults matches={matches.slice(0, currentWeek)} />
          <PlayerStats stats={playerStats} />
        </>
      )}
    </div>
  );
};

export default LeagueTable;