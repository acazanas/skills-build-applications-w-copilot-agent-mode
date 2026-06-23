import React from 'react';
import Activities from './Activities';
import Leaderboard from './Leaderboard';
import Teams from './Teams';
import Users from './Users';
import Workouts from './Workouts';

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
