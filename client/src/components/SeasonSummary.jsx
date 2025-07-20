import React from 'react';

const SeasonSummary = ({ champion, relegated, topScorer, resetSeason }) => {
  return (
    <div>
      <h2>Season Ended</h2>
      <p>Champion: {champion}</p>
      <p>Relegated: {relegated}</p>
      <p>Top Scorer: {topScorer}</p>
      <button onClick={resetSeason}>Reset Season</button>
    </div>
  );
};

export default SeasonSummary;