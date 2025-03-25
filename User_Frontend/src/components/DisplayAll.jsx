import React, { useState, useEffect } from 'react';
import UpdateUser from './UpdateUser.jsx';

function DisplayAll() {
  const [users, setUsers] = useState([]);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/api/users/${id}`, { method: 'DELETE' });
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div>
      <h3>All Users</h3>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>
                <button onClick={() => setUpdateId(user.id)}>Update</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {updateId && <UpdateUser id={updateId} setUpdateId={setUpdateId} setUsers={setUsers} />}
    </div>
  );
}

export default DisplayAll;