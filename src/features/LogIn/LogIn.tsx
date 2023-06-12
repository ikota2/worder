import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Input from '../../components/Input/Input';
import { useAuth } from '../../contexts/AuthContext';
import { auth } from '../../firebase';

import classes from '../SignUp/SignUp.module.css';

const LogIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const history = useHistory();
  async function handleSubmit (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(auth, email, password);
      history.push('/');
    } catch {
      setError('Failed to log in')
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className={classes.mainContainer}>
      <div className={classes.formContainer}>
        <h2>Log In</h2>
        {loading && <span style={{fontWeight: 800}}>Loading.....</span>}
        {error && <span style={{fontWeight: 800}}>{error}</span>}

        <form onSubmit={handleSubmit} className={classes.form}>
          <Input
            type="email"
            name="email"
            label="Email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>)=> setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            minLength={6}
            name="password"
            label="Password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>)=> setPassword(e.target.value)}
            required
          />
          <div className={classes.container}>
            <button type="submit" className={classes.btn} disabled={loading}>Log In</button>
          </div>
        </form>
        <div className={classes.container}>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <div className={classes.container}>
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
