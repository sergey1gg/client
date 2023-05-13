import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./Directory.module.css"
import { setNewDirectory } from '../../actions/directory-api';

const Directory = () => {
  const dispatch=useDispatch()
  const [selectedItems, setSelectedItems] = useState();
  const [dataArray, setDataArray] = useState([]);
  const [isValid, setIsValid]=useState()
  const [value,setValue]=useState()
  const directory=useSelector(state=>state.act.directory)
const handleChange = (e) => {
  const { value } = e.target;
  setValue(value);
  try {
    const parsedData = JSON.parse(value);
    setDataArray(parsedData);
    setIsValid(true);
  } catch (error) {
    setDataArray([]);
    setIsValid(false);
  }
};
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      console.log(dataArray);
      dispatch(setNewDirectory(dataArray))
    } else {
      alert('Некорректный формат JSON');
    }
  };
  return (
    <>
    <div className={styles.table}>
      <div className={styles.column}>
        <div className={styles.columnHeader}>Rooms</div>
        {directory.rooms.map((room) => (
          <div key={room._id} className={styles.item}>
            {room.name}
            {room.options.map((option) => (
              <div key={option} className={styles.subItem}>
                - {option}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.column}>
        <div className={styles.columnHeader}>Elements</div>
        {directory.elements.map((element) => (
          <div key={element._id} className={styles.item}>
            {element.name}
            {element.options.map((option) => (
              <div key={option} className={styles.subItem}>
                - {option}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.column}>
        <div className={styles.columnHeader}>Otdelka</div>
        {directory.otdelka.map((otdelka) => (
          <div key={otdelka._id} className={styles.item}>
            {otdelka.name}
            {otdelka.options.map((option) => (
              <div key={option} className={styles.subItem}>
                - {option}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.column}>
        <div className={styles.columnHeader}>Defects</div>
        {directory.defects.map((defect) => (
          <div key={defect._id} className={styles.item}>
            {defect.name}
            {defect.options.map((option) => (
              <div key={option} className={styles.subItem}>
                - {option}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.column}>
        <div className={styles.columnHeader}>Subdefects</div>
        {directory.subdefects.map((subdefect) => (
          <div key={subdefect._id} className={styles.item}>
            {subdefect.name}
            {subdefect.options.map((option) => (
              <div key={option} className={styles.subItem}>
                - {option}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>

    <form onSubmit={handleSubmit}>
      <label>
        Вставьте массив:
        <textarea style={{width: '100%', height: 500}}
          value={value}
          onChange={handleChange}
        />
      </label>
      <br />

      <button type="submit">Submit</button>
    </form>
    </>
  );
  
};

export default Directory;