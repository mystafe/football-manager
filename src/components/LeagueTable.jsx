import React, { useState, useEffect } from 'react';
import teamsData from '../data/teams.json';
import { simulateMatch } from '../utils/simulateMatch';
import TeamTable from './TeamTable';
import MatchResults from './MatchResults';
import SeasonSummary from './SeasonSummary';
import PlayerStats from './PlayerStats';
import { initializeTable } from '../utils/initializeTable';
import { initializePlayerStats } from '../utils/initializePlayerStats';
import { updateTable } from '../utils/updateTable';
import { determineTopScorer } from '../utils/determineTopScorer';
import { updatePlayerStats } from '../utils/updatePlayerStats';

const LeagueTable = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [matches, setMatches] = useState([]);
  const [table, setTable] = useState([]);
  const [playerStats, setPlayerStats] = useState([]);
  const [topScorer, setTopScorer] = useState(null);
  const [seasonEnded, setSeasonEnded] = useState(false);

  useEffect(() => {
    const initialTable = initializeTable(teamsData);
    const initialPlayerStats = initializePlayerStats(teamsData);
    setTable(initialTable);
    setPlayerStats(initialPlayerStats);
  }, []);

  const handleNextWeek = () => {
    if (seasonEnded) return;

    const newMatches = [];
    const weekMatches = [];

    for (let i = 0; i < teamsData.length; i += 2) {
      if (i + 1 < teamsData.length) {
        const isHomeTeamA = (currentWeek % 2 === 0);
        const result = simulateMatch(teamsData[i], teamsData[i + 1], isHomeTeamA);
        weekMatches.push(result);
        setPlayerStats(prevStats => {
          const updatedStats = updatePlayerStats(prevStats, result);
          setTable(prevTable => updateTable(prevTable, result, updatedStats));
          return updatedStats;
        });
      }
    }
    newMatches.unshift({ week: currentWeek + 1, matches: weekMatches }); // Yeni haftayı en üste ekleyin
    setMatches([...newMatches, ...matches]);
    setCurrentWeek(currentWeek + 1);

    if (currentWeek + 1 >= (teamsData.length - 1) * 2) {
      setSeasonEnded(true);
      setTopScorer(determineTopScorer([...newMatches, ...matches]));
    }
  };

  const resetSeason = () => {
    const initialTable = table.map(team => ({
      ...team,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      points: 0
    }));

    const initialPlayerStats = playerStats.map(player => ({
      ...player,
      goals: 0
    }));

    setCurrentWeek(0);
    setMatches([]);
    setTable(initialTable);
    setPlayerStats(initialPlayerStats);
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