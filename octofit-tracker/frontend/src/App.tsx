import React from 'react';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1>OctoFit Tracker</h1>
        <p className="lead">Modern multi-tier fitness tracker powered by React, Express, and MongoDB.</p>
      </div>

      <div className="row gy-4">
        <div className="col-12">
          <Users />
        </div>
        <div className="col-12">
          <Teams />
        </div>
        <div className="col-12">
          <Activities />
        </div>
        <div className="col-12">
          <Leaderboard />
        </div>
        <div className="col-12">
          <Workouts />
        </div>
      </div>
    </div>
  );
}

export default App;
