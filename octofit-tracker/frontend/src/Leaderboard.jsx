import React, { useEffect, useState } from 'react';

const endpoint = '/api/leaderboard/';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setLeaderboard(data.data || []);
      })
      .catch((err) => setError(err.message || 'Fetch failed'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="my-4">
      <h2>Leaderboard</h2>
      <p>Endpoint: <code>{endpoint}</code></p>
      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="text-danger">Error: {error}</p>}
      {!loading && !error && (
        <pre>{JSON.stringify(leaderboard, null, 2)}</pre>
      )}
    </section>
  );
}

export default Leaderboard;
