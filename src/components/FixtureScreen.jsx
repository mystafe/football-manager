import React from 'react';

const FixtureScreen = ({ teams, onGenerateFixture }) => {
  return (
    <div>
      <h1>Generate Fixture</h1>
      <button onClick={() => onGenerateFixture(teams)}>Generate Fixture</button>
    </div>
  );
};

export default FixtureScreen;