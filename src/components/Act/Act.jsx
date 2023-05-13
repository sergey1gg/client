import React, { useEffect, useState } from 'react';
import s from "./Act.module.css"
import { Rooms } from './Rooms';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentAct } from '../../actions/act-api';

export function Act() {
  const rooms =useSelector(state=>state.act.rooms)
  const dispatch = useDispatch();
  const actId = window.location.pathname.split('/')[2];

  useEffect(() => {
    const fetchAct = async () => {
      const rooms=await dispatch(getCurrentAct(actId));
    };
    fetchAct();
  }, []);


  return (
    <>
      {rooms ? (
        <Rooms fullrooms={rooms} actId={actId}/>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

