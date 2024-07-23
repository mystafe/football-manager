import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { simulateMatch } from '../utils/simulateMatch';
import { initializeTable } from '../utils/initializeTable';
import { initializePlayerStats } from '../utils/initializePlayerStats';
import { updateTable } from '../utils/updateTable';
import determineTopScorer from '../utils/determineTopScorer';
import { updatePlayerStatsAfterMatch } from '../utils/updatePlayerStatsAfterMatch';
import TeamTable from './TeamTable';
import MatchResults from './MatchResults';
import PlayerStats from './PlayerStats';
import SeasonSummary from './SeasonSummary';
import FixtureScreen from './FixtureScreen';
import { generateFixture } from '../utils/generateFixture';
import { Fixture, NextWeekButton, GenerateFixtureButton, ResetSeasonButton } from './LeagueTableHelpers';
import { Container, Box, Typography, Paper } from '@mui/material';

const LeagueTable = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [matches, setMatches] = useState([]);
  const [table, setTable] = useState([]);
  const [playerStats, setPlayerStats] = useState([]);
  const [topScorer, setTopScorer] = useState(null);
  const [seasonEnded, setSeasonEnded] = useState(false);
  const [fixtureGenerated, setFixtureGenerated] = useState(false);
  const [showFixture, setShowFixture] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/teams`);
        const teamsData = teamsResponse.data;
        const initialTable = initializeTable(teamsData);
        const initialPlayerStats = initializePlayerStats(teamsData);
        setTable(initialTable);
        setPlayerStats(initialPlayerStats);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleGenerateFixture = (teams) => {
    const shuffledTeams = [...teams].sort(() => 0.5 - Math.random());
    const fixture = generateFixture(shuffledTeams);
    setMatches(fixture);
    setFixtureGenerated(true);
    setShowFixture(true);
  };

  const handleStartMatches = () => {
    handleNextWeek();
    setShowFixture(false);
  };

  const handleNextWeek = () => {
    if (seasonEnded) return;

    const weekMatches = matches[currentWeek]?.matches || [];
    const results = [];

    weekMatches.forEach(match => {
      const homeTeam = table.find(team => team.name === match.home.name);
      const awayTeam = table.find(team => team.name === match.away.name);

      if (homeTeam && awayTeam) {
        const result = simulateMatch({ ...homeTeam, players: match.home.players }, { ...awayTeam, players: match.away.players }, true);
        results.push(result);
      }
    });

    results.forEach(result => {
      setTable(prevTable => updateTable(prevTable, result));
      setPlayerStats(prevStats => updatePlayerStatsAfterMatch(prevStats, result));
    });

    setMatches(prevMatches => [
      ...prevMatches.slice(0, currentWeek),
      { week: currentWeek + 1, matches: results },
      ...prevMatches.slice(currentWeek + 1)
    ]);

    setCurrentWeek(prevWeek => prevWeek + 1);

    if (currentWeek + 1 >= matches.length) {
      setSeasonEnded(true);
      setTopScorer(determineTopScorer(matches));
    }
  };

  const resetSeason = () => {
    const fetchData = async () => {
      try {
        const teamsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/teams`);
        const teamsData = teamsResponse.data;
        const initialTable = initializeTable(teamsData);
        const initialPlayerStats = initializePlayerStats(teamsData);
        setTable(initialTable);
        setPlayerStats(initialPlayerStats);
        setCurrentWeek(0);
        setMatches([]);
        setTopScorer(null);
        setSeasonEnded(false);
        setFixtureGenerated(false);
        setShowFixture(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  };

  const sortedTable = [...table].sort((a, b) => b.points - a.points);

  return (
    <Container>
      <Box mt={4}>
        {!fixtureGenerated ? (
          <FixtureScreen 
            teams={table} 
            onGenerateFixture={handleGenerateFixture} 
            fixture={matches} 
            onStartMatches={handleStartMatches} 
          />
        ) : (
          <>
            <Typography variant="h4" component="h1" align="center">League Table</Typography>
            {showFixture ? (
              <Fixture matches={matches} handleStartMatches={handleStartMatches} />
            ) : (
              <>
                <NextWeekButton handleNextWeek={handleNextWeek} seasonEnded={seasonEnded} />
                {seasonEnded && (
                  <SeasonSummary
                    champion={sortedTable[0].name}
                    relegated={sortedTable[sortedTable.length - 1].name}
                    topScorer={topScorer}
                    resetSeason={resetSeason}
                  />
                )}
                <Paper style={{ marginTop: '20px', padding: '10px' }}>
                  <TeamTable table={sortedTable} />
                  {currentWeek > 0 && (
                    <MatchResults matches={matches.slice(0, currentWeek)} />
                  )}
                  <PlayerStats stats={playerStats} />
                </Paper>
                {seasonEnded && (
                  <ResetSeasonButton handleReset={resetSeason} />
                )}
              </>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default LeagueTable;