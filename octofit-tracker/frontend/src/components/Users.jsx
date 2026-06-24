import React, { useEffect, useState } from 'react';

// Endpoint: https://<CODESPACE_NAME>-8000.app.github.dev/api/users
const endpoint = '/api/users/';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => setUsers(data.data || []))
      .catch((err) => setError(err.message || 'Fetch failed'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <p>Error: {error}</p>}
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </section>
  );
}

export default Users;
