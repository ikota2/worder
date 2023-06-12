import React, { StrictMode } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute/PrivateRoute';
import SignUp from '../features/SignUp/SignUp';
import Dashboard from '../features/Dashboard/Dashboard';
import LogIn from '../features/LogIn/LogIn';
import ForgotPassword from '../features/ForgotPassword/ForgotPassword';
import UpdateProfile from '../features/UpdateProfile/UpdateProfile';
import AuthProvider from '../contexts/AuthContext';

function App() {

  return (
    <Router>
      <StrictMode>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={LogIn} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </AuthProvider>
      </StrictMode>
    </Router>
  );
}

export default App;
