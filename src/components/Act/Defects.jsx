import React, { useState } from 'react';
import s from "./Act.module.css"
import { InputMany } from '../common/InputMany';
import { useDispatch, useSelector } from 'react-redux';
import { setRooms } from '../../reducers/actReducer';
import {useLocation, useNavigate} from 'react-router-dom'

import { addDefect, deleteDefect, editDefect } from '../../actions/defects-api';
import { SubDefects } from './SubDefects';
export const Defects=({fullrooms, actId, selectedRoom,selectedElement, selectedOtdelka ,selectedRoomName})=>{
    const rooms=  fullrooms[selectedRoom]?.items[selectedElement]?.otdelka[selectedOtdelka]?.troubles?.map(item => item.name);

    const location =useLocation()
    const navigate=useNavigate()
    const dispatch=useDispatch()
    //const [rooms, setRooms] = useState(props.rooms);
    const [showAddRoom, setShowAddRoom] = useState(false);
    const [roomInputs, setRoomInputs] = useState([{ name: '', count: 1 }]);
    const [editingRoomIndex, setEditingRoomIndex] = useState(-1);
    const [editingRoomName, setEditingRoomName] = useState('');
    const [roomButtons, setRoomButtons] = useState({});
    const [showSett, setShowSett] = useState(false);

    const [selectedDefect, setSelectedRoom] = useState(null);
    const [counter, setCounter] = useState(0);

    const [roomName,setRoomName]=useState("")

    const directory=useSelector(state=>state.act.directory)
    const handleAddRoom = (event) => {
      event.preventDefault();
      const newRooms = [];
      roomInputs.forEach(({ name, count }) => {
        for (let i = 1; i <= count; i++) {
          newRooms.push(name);
        }
      });
      dispatch(addDefect(actId, selectedRoom, selectedElement,selectedOtdelka, newRooms))
      setShowAddRoom(false);
      setRoomInputs([{ name: '', count: 1 }]);
      setSelectedRoom(null);
      setRoomName("")
    };
  
    const handleRoomInputNameChange = (event, index) => {
      const updatedInputs = [...roomInputs];
      updatedInputs[index].name = event.target.value;
      setRoomInputs(updatedInputs);
    };
  
    const handleRoomInputCountChange = (event, index) => {
      const updatedInputs = [...roomInputs];
      updatedInputs[index].count = event.target.value;
      setRoomInputs(updatedInputs);
    };
  
    const handleRoomCountIncrement = (index) => {
      const updatedInputs = [...roomInputs];
      updatedInputs[index].count = parseInt(updatedInputs[index].count) + 1;
      setRoomInputs(updatedInputs);
    };
  
    const handleRoomCountDecrement = (index) => {
      const updatedInputs = [...roomInputs];
      updatedInputs[index].count =
        parseInt(updatedInputs[index].count) - 1 >= 1
          ? parseInt(updatedInputs[index].count) - 1
          : 1;
      setRoomInputs(updatedInputs);
    };
    const handleRenameRoom = (index) => {
      const newRooms = [...rooms];
      newRooms[index] = editingRoomName;
      dispatch(editDefect(actId,selectedRoom,selectedElement,selectedOtdelka,index,editingRoomName))
      setEditingRoomIndex(-1);
    };
  
  const cancelEditRoom = () => {
      setEditingRoomIndex(-1);
      setEditingRoomName('');
  };
  
  const handleDeleteRoom = (index) => {
    const newRooms = [...rooms];
    newRooms.splice(index, 1);
    dispatch(deleteDefect(actId,selectedRoom,selectedElement,selectedOtdelka,index))
    setSelectedRoom(null);
        setRoomName("")
  };
  
  const handleCopyRoom = (index) => {
    const newRooms = [...rooms];
    const copyRoom = { ...newRooms[index] };
    copyRoom.name += ' - Копия';
    newRooms.splice(index + 1, 0, copyRoom);
    dispatch(setRooms(newRooms));
    setSelectedRoom(null);
    setRoomName("")
  };
  
  const handleToggleShowButtons = () => {
    if(rooms.length>0){
    setShowSett(!showSett);
    setSelectedRoom(null)
    setRoomName("")
    }
  };
  ;

    
  const handleSelectRoom=(index,name)=>{
    setSelectedRoom(index);
    setRoomName(name)
    //const currentParams = new URLSearchParams(location.search);
    //currentParams.set('element', index); 
    //navigate(`${location.pathname}?${currentParams.toString()}`);
  }

  if (!rooms) {
    return null; // Если rooms равно undefined, скрываем компоненту
  }
    return (
      <>
        <div className={s['room-list']}>
          <h3 onClick={handleToggleShowButtons} style={{cursor: 'pointer'}}>Наименования замечания:</h3>
          <div style={{ display: 'flex' }}>
          {rooms && rooms.map((room, index) => (
          <div
            key={index}
            style={{ marginLeft: '10px', cursor:"pointer"}}
            className={selectedDefect === index ? `${s.selectedRoom}` : ''}
            onClick={()=> handleSelectRoom(index,room)}
          >
            <h4>{room}</h4>
          </div>
        ))}
          </div>
        </div>
        {showSett ?(<RoomList rooms={rooms}
    onEditRoom={handleRenameRoom}
    onDeleteRoom={handleDeleteRoom}
    onCopyRoom={handleCopyRoom}
    onEditingRoomNameChange={(value) => setEditingRoomName(value)}/>):null}
        {showAddRoom ? (
          <div>
            <InputMany handleAddRoom={handleAddRoom} handleRoomInputNameChange={handleRoomInputNameChange}
            handleRoomCountDecrement={handleRoomCountDecrement} handleRoomCountIncrement={handleRoomCountIncrement}
            setRoomInputs={setRoomInputs} setShowAddRoom={setShowAddRoom} roomInputs={roomInputs}
            directory={directory.otdelka} selectedRoomName={selectedRoomName}/>
            
          </div>
          
        ) : (
          
          <button className={s.addButton} onClick={() => setShowAddRoom(true)}>
            Добавить замечание
          </button>
        )}
      {selectedOtdelka !== null && (
        <SubDefects fullrooms={fullrooms} selectedRoom={selectedRoom} actId={actId} 
        selectedElement={selectedElement} selectedOtdelka={selectedOtdelka} selectedDefect={selectedDefect}
        selectedRoomName={roomName}/>
      )}
      </>
    );
  }
  
  const RoomList = ({ rooms, editingRoomName, onEditRoom, onDeleteRoom, onCopyRoom, onEditingRoomNameChange }) => {
    const [roomButtons, setRoomButtons] = useState({});
    const [showButtons, setShowButtons] = useState(true);
  
    const toggleRoomButtons = (index) => {
      setRoomButtons((prevState) => ({
        ...prevState,
        [index]: !prevState[index],
      }));
    };

    return (
      <>
        {showButtons && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {rooms.map((room, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                <h4>{room}</h4>
                <div style={{ marginLeft: '10px' }}>
                  {roomButtons[index] ? (
                    <>
                      <input
                        type="text"
                        value={editingRoomName}
                        onChange={(e) => onEditingRoomNameChange(e.target.value)}
                      />
                      <button onClick={() => onEditRoom(index)}>Сохранить</button>
                      <button onClick={() => toggleRoomButtons(index)}>Отмена</button>
                    </>
                  ) : (
                    <>
                      <span onClick={() => onDeleteRoom(index)}>Удалить/</span>
                      {/*<span onClick={() => onCopyRoom(index)}>Копировать/</span>*/}
                      <span onClick={() => toggleRoomButtons(index)}>Редактировать</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
      </>
    );
  };