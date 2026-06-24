import React, { useEffect, useState } from 'react';

// Endpoint: https://<CODESPACE_NAME>-8000.app.github.dev/api/teams
const endpoint = '/api/teams/';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => setTeams(data.data || []))
      .catch((err) => setError(err.message || 'Fetch failed'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <p>Error: {error}</p>}
      <pre>{JSON.stringify(teams, null, 2)}</pre>
    </section>
  );
}

export default Teams;
