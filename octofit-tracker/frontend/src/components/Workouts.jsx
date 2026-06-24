import React, { useEffect, useState } from 'react';

// Endpoint: https://<CODESPACE_NAME>-8000.app.github.dev/api/workouts
const endpoint = '/api/workouts/';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => setWorkouts(data.data || []))
      .catch((err) => setError(err.message || 'Fetch failed'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <p>Error: {error}</p>}
      <pre>{JSON.stringify(workouts, null, 2)}</pre>
    </section>
  );
}

export default Workouts;
