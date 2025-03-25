import React, { useState } from 'react';
import AddUser from './AddUser';
import DisplayAll from './DisplayAll';
import Search from './Search';

function HomePage() {
  const [view, setView] = useState('');

  return (
    <div style={{ padding: '20px' }}>
      <h2>Home Page</h2>
      <button onClick={() => setView('add')}>Add</button>
      <button onClick={() => setView('display')}>Display All</button>
      <button onClick={() => setView('search')}>Search</button>

      {view === 'add' && <AddUser />}
      {view === 'display' && <DisplayAll />}
      {view === 'search' && <Search />}
    </div>
  );
}

export default HomePage;