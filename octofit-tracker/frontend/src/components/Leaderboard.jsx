import React, { useEffect, useState } from 'react';

// Endpoint: https://<CODESPACE_NAME>-8000.app.github.dev/api/leaderboard
const endpoint = '/api/leaderboard/';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => setLeaderboard(data.data || []))
      .catch((err) => setError(err.message || 'Fetch failed'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      {error && <p>Error: {error}</p>}
      <pre>{JSON.stringify(leaderboard, null, 2)}</pre>
    </section>
  );
}

export default Leaderboard;
