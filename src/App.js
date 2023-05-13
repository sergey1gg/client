import './App.css';
import {BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import  Header  from './components/Header/Header';
import Users from './components/Users/Users';
import { auth, initializeApp } from './actions/user-api';
import { Act } from './components/Act/Act';
import { getDirectory } from './actions/directory-api';
import Directory from './components/Directory/Directory';

function App() {
   
  const isAuth = useSelector(state => state.auth.isAuth);
  const initialize = useSelector(state => state.app.initialize)
  const dispatch=useDispatch()

  useEffect(() => {
    dispatch(initializeApp())
      if (localStorage.getItem('token')) {
       dispatch(auth());
      dispatch(getDirectory())
      }
  }, []);
  if(!initialize){
    return (
    <div>initialize</div>
    )
  }

  return (
    <BrowserRouter>
      <div className="main">
        <div className="app-wrapper">
          <Header/>
          <main>
            <div className="app-wrapper-content">
              <Routes>
              <Route path='/login' element={<Login/>} />
              <Route path='/' element={<Profile/>}/>
              <Route path='/users' element={<Users/>}/>
              <Route path='/act/:actId' element={<Act/>}/>
              <Route path='/directory' element={<Directory/>}/>
              </Routes>
            </div>
          </main>        
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
