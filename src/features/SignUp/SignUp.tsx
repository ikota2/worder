import React, { ChangeEvent, FormEvent, useState } from 'react';
import Input from '../../components/Input/Input';
import { useAuth } from '../../contexts/AuthContext';
import { auth } from '../../firebase';

import classes from './SignUp.module.css';

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, currentUser } = useAuth();
  async function handleSubmit (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return setError('Passwords are not the same');
    }

    try {
      setError('');
      setLoading(true);
      await signup(auth, email, password);
    } catch {
      setError('Failed to create an account')
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={classes.mainContainer}>
      <div className={classes.formContainer}>
        <h2>Sign Up</h2>
        {loading && <span style={{fontWeight: 800}}>Loading.....</span>}
        {error && <span style={{fontWeight: 800}}>{error}</span>}
        {<h3>{currentUser.email}</h3>}
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
          <Input
            type="password"
            minLength={6}
            name="password-confirm"
            label="Password Confirmation"
            value={passwordConfirm}
            onChange={(e: ChangeEvent<HTMLInputElement>)=> setPasswordConfirm(e.target.value)}
            required
          />
          <div className={classes.container}>
            <button type="submit" className={classes.btn} disabled={loading}>Sign Up</button>
          </div>
        </form>
        <div className={classes.container}>
          Already have an account? Log In
        </div>
      </div>
    </div>
  );
};

export default SignUp;
