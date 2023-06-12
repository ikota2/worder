import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';

import Input from '../../components/Input/Input';
import { useAuth } from '../../contexts/AuthContext';

import classes from '../SignUp/SignUp.module.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { resetPassword } = useAuth();

  async function handleSubmit (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setError('');
      setMessage('');
      setLoading(true);
      await resetPassword(auth, email);
      setMessage('Check your inbox');
    } catch {
      setError('Failed to reset password')
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className={classes.mainContainer}>
      <div className={classes.formContainer}>
        <h2>Password Reset</h2>
        {loading && <span style={{fontWeight: 800}}>Loading.....</span>}
        {error && <span style={{fontWeight: 800}}>{error}</span>}
        {message.length > 0 && <span style={{fontWeight: 800}}>{message}</span>}

        <form onSubmit={handleSubmit} className={classes.form}>
          <Input
            type="email"
            name="email"
            label="Email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>)=> setEmail(e.target.value)}
            required
          />
          <div className={classes.container}>
            <button type="submit" className={classes.btn} disabled={loading}>Reset password</button>
          </div>
        </form>
        <div className={classes.container}>
          <Link to="/login">Log in</Link>
        </div>
        <div className={classes.container}>
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
