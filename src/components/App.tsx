import React from 'react';
import SignUp from '../features/SignUp/SignUp';
import AuthProvider from '../contexts/AuthContext';

function App() {

  return (
    <AuthProvider>
      <SignUp />
    </AuthProvider>
  );
}

export default App;
