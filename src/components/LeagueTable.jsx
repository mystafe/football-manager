import React, { useState, useEffect } from 'react';
import teamsData from '../data/teams.json';
import { simulateMatch } from '../utils/simulateMatch';
import TeamTable from './TeamTable';
import MatchResults from './MatchResults';
import SeasonSummary from './SeasonSummary';
import PlayerStats from './PlayerStats';
import { initializeTable, initializePlayerStats, updateTable, determineTopScorer, updatePlayerStats } from '../utils/tableUtils';

const LeagueTable = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [matches, setMatches] = useState([]);
  const [table, setTable] = useState([]);
  const [playerStats, setPlayerStats] = useState([]);
  const [topScorer, setTopScorer] = useState(null);
  const [seasonEnded, setSeasonEnded] = useState(false);

  useEffect(() => {
    setTable(initializeTable(teamsData));
    setPlayerStats(initializePlayerStats(teamsData));
  }, []);

  const handleNextWeek = () => {
    if (seasonEnded) return;

    const newMatches = [...matches];
    const weekMatches = [];

    for (let i = 0; i < teamsData.length; i += 2) {
      if (i + 1 < teamsData.length) {
        const result = simulateMatch(teamsData[i], teamsData[i + 1]);
        weekMatches.push(result);
        setTable(prevTable => updateTable(prevTable, result));
        setPlayerStats(prevStats => updatePlayerStats(prevStats, result));
      }
    }
    newMatches.push({ week: currentWeek + 1, matches: weekMatches });
    setMatches(newMatches);
    setCurrentWeek(currentWeek + 1);

    if (currentWeek + 1 >= (teamsData.length - 1) * 2) {
      setSeasonEnded(true);
      setTopScorer(determineTopScorer(newMatches));
    }
  };

  const resetSeason = () => {
    setCurrentWeek(0);
    setMatches([]);
    setTable(initializeTable(teamsData));
    setPlayerStats(initializePlayerStats(teamsData));
    setTopScorer(null);
    setSeasonEnded(false);
  };

  const sortedTable = [...table].sort((a, b) => b.points - a.points);

  return (
    <div>
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
      <MatchResults matches={matches} />
      <PlayerStats stats={playerStats} />
    </div>
  );
};

export default LeagueTable;