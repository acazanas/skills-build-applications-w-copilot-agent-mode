import React, { useEffect, useState } from 'react';

const endpoint = '/api/users/';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.data || []);
      })
      .catch((err) => setError(err.message || 'Fetch failed'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="my-4">
      <h2>Users</h2>
      <p>Endpoint: <code>{endpoint}</code></p>
      {loading && <p>Loading users...</p>}
      {error && <p className="text-danger">Error: {error}</p>}
      {!loading && !error && (
        <pre>{JSON.stringify(users, null, 2)}</pre>
      )}
    </section>
  );
}

export default Users;
