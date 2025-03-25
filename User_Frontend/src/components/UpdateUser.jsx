import React, { useState } from 'react';

function UpdateUser({ id, setUpdateId, setUsers }) {
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, mobile }),
    });
    const data = await response.json();
    setUsers(prev => prev.map(u => (u.id === id ? data.user : u)));
    setUpdateId(null);
  };

  return (
    <div>
      <h3>Update User</h3>
      <form onSubmit={handleUpdate}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="New Email" />
        <input value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="New Mobile" />
        <button type="submit">Update</button>
        <button onClick={() => setUpdateId(null)}>Cancel</button>
      </form>
    </div>
  );
}

export default UpdateUser;