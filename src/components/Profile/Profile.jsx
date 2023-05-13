import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addAct, copyAct, deleteAct, getAllAct } from '../../actions/act-api';
import * as XLSX from "xlsx"
const Profile = () => {
  const dispatch=useDispatch()
  const currentUser=useSelector(state=> state.auth.currentUser)
  const isAuth = useSelector(state => state.auth.isAuth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [number, setNumber]=useState("")
  const [FIO, setFIO]=useState("")
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');
  const [isOtdelka, setIsOtdelka] = useState(false);

  const [acts,setActs]=useState('')
  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };
  const handleFIOChange = (event) => {
    setFIO(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleOtdelkaChange = (event) => {
    setIsOtdelka(event.target.checked);
  };


  const handleSubmit =  (event) => {
  event.preventDefault();
  dispatch(addAct(number, FIO, address, isOtdelka, date))
  window.location.reload()
  };
  const handleAddButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const acts = await dispatch(getAllAct());
        setActs(acts);
      } catch (e) {
        console.log(e);
      }
    }
    
    fetchData();
  }, []);
  if (!isAuth){
    return <Navigate to="/login"/>
  }
  const generateAct = (id) => {
    const act = acts.filter(act => act._id === id)[0];
  
    if (!act) {
      console.error('Акт не найден');
      return;
    }
    const checkdate = new Date(act.date);  
    const formattedDate = `${checkdate.getDate()}.${checkdate.getMonth() + 1}.${checkdate.getFullYear()}`; 

    const header = [
      ["Акту осмотра квартиры №" + act.number + " " + formattedDate],
      ['Заказчик: ' + act.FIO],
      ["Дата и время осмотра: " + act.checkdate],
      ["Адрес осмотра: " + act.address],
      []
    ];
  
    const rows = [];
    act.rooms.forEach((room, roomIndex) => {
      rows.push([])
      rows.push([`Помещение ${roomIndex + 1}` + room.name]);
      room.items.forEach((item) => {
        rows.push([item.name]);
  
        item.otdelka.forEach((otdelka) => {
          rows.push([`${otdelka.name}`]);
          otdelka.troubles.forEach((trouble, troubleIndex) => {
            const subDefects = trouble.subDefects.map((subDefect) => {
              return `${subDefect.name} (${subDefect.comment})`;
            });
            rows.push([`${troubleIndex + 1}) ${trouble.name}`, ...subDefects]);
          });
          
        });
      });
    });


    const worksheet = XLSX.utils.aoa_to_sheet([...header, ...rows]);
    const workbook = XLSX.utils.book_new();
    
    const columnWidths = [
      { wch: 35 },
      { wch: 55 },
      { wch: 55 },
      { wch: 55 }, // Ширина столбца A (в символах)
      { wch: 55 }
  
      // Другие столбцы
    ];
    
    // Установка ширины столбцов
    worksheet['!cols'] = columnWidths;
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Акт');
  
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(data);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = 'act.xlsx';
    link.click();
  
    URL.revokeObjectURL(url);
  };
  const newActs = Object.values(acts)
  .filter(act => currentUser.role === "ADMIN" || currentUser.id === act.author._id)
  .map((act, index) => {
    return (
    <tr key={index}>
      <td>{act.date.trim()}</td>
      <td>{act.number.trim()}</td>
      <td>{act.FIO.trim()}</td>
      <td>{act.address.trim()}</td> 
      <td>{act.author.username.trim()}</td> 
      <td>{act.category.trim()}</td> 
      <td>01.02.2023</td>
        <td>
          <button className={styles.editButton} onClick={() => window.location.href = `/act/${act._id}`}>Редактировать</button>
          <button className={styles.copyButton} onClick={() =>{ dispatch(copyAct(act._id)); window.location.reload()}}>Скопировать</button>
          <button className={styles.deleteButton} onClick={() =>{ dispatch(deleteAct(act._id)); window.location.reload()}}>Удалить</button>
          <button style={{background: '#28a745'}} className={styles.copyButton} onClick={()=> generateAct(act._id)}>Сгенерировать акт</button>
        </td>
    </tr>
  )})
  console.log(acts)
  return (
    <>
          <div className={styles.actions}>
        <button className={styles.addButton} onClick={handleAddButtonClick}>+ Добавить акт</button>
      </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={handleCloseModal}>×</button>
            <form onSubmit={handleSubmit}>
              <div style={{display: 'flex',justifyContent: 'flex-start'}}>
          <span style={{fontWeight: 'bold',fontSize: '20px'}}>Новый акт №</span> 
          <input type="number" id="number"value={number} onChange={handleNumberChange} required/>
          </div>
          <div>
            <label htmlFor="name">ФИО</label>
            <input className={styles.inputUser} type="text" id="name" value={FIO} onChange={handleFIOChange} required />
          </div>
          <div>
            <label htmlFor="name">Адрес</label>
            <input className={styles.inputUser} type="text" id="name" value={address} onChange={handleAddressChange} required />
          </div>
          <div>
            <label htmlFor="date">Дата и время осмотра:</label>
            <input  className={styles.inputUser} type="text" id="date" value={date} onChange={handleDateChange}  required />
          </div>
          <div>
            <input type="checkbox" id="isOtdelka" value={isOtdelka} onChange={handleOtdelkaChange}/>
            <label htmlFor="isOtdelka" >C отделкой?</label>
          </div>
          <button type="submit" className={styles.addButton}>Добавить</button>
        </form>
          </div>
        </div>
      )}
    <table className={styles.actTable}>
    <thead>
      <tr>
        <th>Дата</th>
        <th>Номер акта</th>
        <th>ФИО заказчика</th>
        <th>Адрес</th>
        <th>Автор</th>
        <th>С отделкой?</th>
        <th>Дата осмотра</th>
        <th>Действия</th>
        
      </tr>
    </thead>
    <tbody>
      {newActs}
    </tbody>
  </table>
  </>
  );
};



export default Profile;