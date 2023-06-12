import React, { useState } from 'react';
import { auth } from '../../firebase';

import { useAuth } from '../../contexts/AuthContext';
import {Link, useHistory} from 'react-router-dom';

const Dashboard = () => {
  const [error, setError] = useState<string | null>(null);
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError('')
    try {
      await logout(auth);
      history.push('/login');
    } catch {
      setError('failed to log out');
    }

  }

  console.log(currentUser);
  return (
    <div>
      <h2>Profile</h2>
      {error && <span style={{fontWeight: 800}}>{error}</span>}
      <span style={{fontWeight: 800}}>Email: </span><span>{currentUser.email}</span>
      <br />
      <Link to="/update-profile">Update profile</Link>
      <br />
      <button onClick={handleLogout}>log out</button>
    </div>
  );
};

export default Dashboard;
