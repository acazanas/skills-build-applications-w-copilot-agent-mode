import React, { useEffect, useState } from 'react';

const endpoint = '/api/activities/';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setActivities(data.data || []);
      })
      .catch((err) => setError(err.message || 'Fetch failed'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="my-4">
      <h2>Activities</h2>
      <p>Endpoint: <code>{endpoint}</code></p>
      {loading && <p>Loading activities...</p>}
      {error && <p className="text-danger">Error: {error}</p>}
      {!loading && !error && (
        <pre>{JSON.stringify(activities, null, 2)}</pre>
      )}
    </section>
  );
}

export default Activities;
