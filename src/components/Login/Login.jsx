import React, { useState } from 'react';
import styles from './Login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/user-api';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch=useDispatch()
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(username,password))
  };
  const isAuth = useSelector(state => state.auth.isAuth);
  if (isAuth) return <Navigate to='/'/>
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Username:
          <input
            className={styles.input}
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label className={styles.label}>
          Password:
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button className={styles.button} type="submit">
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;