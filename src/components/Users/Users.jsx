import React, { useEffect, useState } from 'react';
import styles from './Users.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, getUsers } from '../../actions/user-api';
import { logout } from '../../reducers/authReducer';
import { Navigate } from 'react-router-dom';
const Users = () => {
  const dispatch=useDispatch()
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [users,setUsers]=useState("")
  const currentUser=useSelector(state=>state.auth)
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAdminChange = (event) => {
    setIsAdmin(event.target.checked);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Отправляем данные формы на сервер
      await dispatch(addUser(name,phone,email,isAdmin,password));
      // После успешной отправки очищаем поля формы
      setName('');
      setPhone('');
      setEmail('');
      setIsAdmin(false);
      setShowAddUserForm(false);
      // Перезагружаем страницу
      window.location.reload();
    } catch (error) {
      // Обработка ошибок при отправке данных на сервер
      console.error(error);
    }
  };
  useEffect(() => {
    const getUsersData = async () => {
      const users = await dispatch(getUsers());
      setUsers(users)
      // здесь вы можете дальше обрабатывать полученные данные
    };
    
    getUsersData();
  }, []);
  const newUsers= Object.values(users).map((user, index) => {
    return (
    <tr key={index}>
      <td>{user.username.trim()}</td>
      <td>{user.phone.trim()}</td>
      <td>{user.email.trim()}</td>
      <td>{user.isAdmin ? 'Yes' : 'No'}</td>
    </tr>
  )})
  if (!currentUser.isAuth || currentUser.currentUser.role===false){
    return <button onClick={()=> {dispatch(logout()); window.location.reload() }}>Выйти</button>
  }
  return (
    <div className={styles.container}>
      <button onClick={()=> {dispatch(logout()); window.location.reload() }}>Выйти</button>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
      <span style={{fontWeight: 'bold'}}>Пользователи</span>
      <button onClick={() => setShowAddUserForm(true)} className={styles.btn}>+ Добавить пользователя</button>
      </div>
      <table className={styles.actTable}>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Телефон</th>
            <th>Почта</th>
            <th>Администратор</th>
          </tr>
        </thead>
        <tbody>
        {newUsers}
        </tbody>
      </table>
      {showAddUserForm && (
        <form onSubmit={handleSubmit}>
          <h2>Добавление пользователя</h2>
          <div>
            <label htmlFor="name">Имя:</label>
            <input className={styles.inputUser} type="text" id="name" value={name} onChange={handleNameChange} required />
          </div>
          <div>
            <label htmlFor="phone">Телефон:</label>
            <input  className={styles.inputUser} type="tel" id="phone" value={phone} onChange={handlePhoneChange} required />
          </div>
          
          <div>
            <label htmlFor="email">Почта:</label>
            <input  className={styles.inputUser} type="email" id="email" value={email} onChange={handleEmailChange} required />
          </div>
          
          <div>
            <label htmlFor="password">Пароль:</label>
            <input  className={styles.inputUser} type="password" id="password" value={password} onChange={handlePasswordChange} required />
          </div>
          <div>
            <input type="checkbox" id="isAdmin" checked={isAdmin} onChange={handleAdminChange} />
            <label htmlFor="isAdmin">Администратор</label>
          </div>

          <button type="submit">Добавить</button>
        </form>
      )}
    </div>
  );
};

export default Users;