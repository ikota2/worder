import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Input from '../../components/Input/Input';
import { useAuth } from '../../contexts/AuthContext';
import { auth } from '../../firebase';

import classes from '../SignUp/SignUp.module.css';

const UpdateProfile = () => {
  const { currentUser, changeEmail, changePassword } = useAuth();
  const [email, setEmail] = useState(currentUser.email)
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return setError('Passwords are not the same');
    }

    const promises: any = [];
    setLoading(true);
    setError('');

    if (email !== currentUser.email) {
      promises.push(changeEmail(auth.currentUser, email as string))
    }
    if (password) {
      promises.push(changePassword(auth.currentUser, password))
    }

    Promise.all(promises)
      .then(() => {
        history.push('/')
      })
      .catch(() => {
        setError('Failed to update an account');
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className={classes.mainContainer}>
      <div className={classes.formContainer}>
        <h2>Update profile</h2>
        {loading && <span style={{fontWeight: 800}}>Loading.....</span>}
        {error && <span style={{fontWeight: 800}}>{error}</span>}
        <form onSubmit={handleSubmit} className={classes.form}>
          <Input
            type="email"
            name="email"
            label="Email"
            // defaultValue={currentUser.email}
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
          />
          <Input
            type="password"
            minLength={6}
            name="password-confirm"
            label="Password Confirmation"
            value={passwordConfirm}
            onChange={(e: ChangeEvent<HTMLInputElement>)=> setPasswordConfirm(e.target.value)}
          />
          <div className={classes.container}>
            <button type="submit" className={classes.btn} disabled={loading}>Update profile</button>
          </div>
        </form>
        <div className={classes.container}>
          <Link to="/">Cancel</Link>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
