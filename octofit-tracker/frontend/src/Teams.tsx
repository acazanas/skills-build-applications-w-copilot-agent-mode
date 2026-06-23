import React, { useEffect, useState } from 'react';

const endpoint = '/api/teams/';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setTeams(data.data || []);
      })
      .catch((err) => setError(err.message || 'Fetch failed'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="my-4">
      <h2>Teams</h2>
      <p>Endpoint: <code>{endpoint}</code></p>
      {loading && <p>Loading teams...</p>}
      {error && <p className="text-danger">Error: {error}</p>}
      {!loading && !error && (
        <pre>{JSON.stringify(teams, null, 2)}</pre>
      )}
    </section>
  );
}

export default Teams;
