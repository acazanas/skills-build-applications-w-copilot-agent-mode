import React, { useEffect, useState } from 'react';

// Endpoint: https://<CODESPACE_NAME>-8000.app.github.dev/api/activities
const endpoint = '/api/activities/';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => setActivities(data.data || []))
      .catch((err) => setError(err.message || 'Fetch failed'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {loading && <p>Loading activities...</p>}
      {error && <p>Error: {error}</p>}
      <pre>{JSON.stringify(activities, null, 2)}</pre>
    </section>
  );
}

export default Activities;
