import React, { useState } from 'react';
import s from '../Act/Act.module.css';

export const InputElements = ({
  handleAddRoom,
  handleRoomInputNameChange,
  handleRoomCountDecrement,
  handleRoomCountIncrement,
  setRoomInputs,
  setShowAddRoom,
  roomInputs,
  directory,
  selectedRoomName
}) => {
  const handleRoomOptionChange = (e, index) => {
    const newRoomInputs = [...roomInputs];
    if (e.target.value === 'Другое') {
      newRoomInputs[index].option = 'Другое';
      setRoomInputs(newRoomInputs);
    } else {
      const updatedInputs = [...roomInputs];
      updatedInputs[index].name = e.target.value;
      setRoomInputs(updatedInputs);
    }
  };

  const handleOptionInputChange = (e, index) => {
    const newRoomInputs = [...roomInputs];
    newRoomInputs[index].name = e.target.value;
    setRoomInputs(newRoomInputs);
  };

  const handleAddRoomOption = () => {
    setRoomInputs([...roomInputs, { name: '', count: 1 }]);
  };

  let elementOptions;
  if (selectedRoomName) {
    const selectedRoom = directory.find(
      (room) => room.name.toLowerCase() === selectedRoomName.toLowerCase()
    );
    elementOptions = selectedRoom ? selectedRoom.options : [];
  } else {
    elementOptions = directory.map((p) => p.name);
  }

  return (
    <>
      <form onSubmit={handleAddRoom}>
        {roomInputs.map((input, index) => (
          <div
            key={index}
          >
            {input.option ? (
              <span>{input.option}</span>
            ) : (
              <>
                {elementOptions.map((option, optionIndex) => (
                  <label key={optionIndex}>
                    <input
                      type="checkbox"
                      value={option}
                      checked={input.name === option}
                      onChange={(e) => handleRoomOptionChange(e, index)}
                      style={{
                        marginRight: '5px',
                        marginBottom: '20px',
                      }}
                    />
                    {option}
                  </label>
                ))}
                <label>
                  <input
                    type="checkbox"
                    value="Другое"
                    checked={input.option === 'Другое'}
                    onChange={(e) => handleRoomOptionChange(e, index)}
                    style={{
                      marginRight: '5px',
                      marginBottom: '20px',
                    }}
                  />
                  Другое
                </label>
              </>
            )}
            {input.option === 'Другое' && (
              <input
                className={s.mainInput}
                type="text"
                placeholder="Свое название"
                value={input.name}
                onChange={(e) => handleOptionInputChange(e, index)}
                required
              />
            )}

          </div>
        ))}
        <button className={s.plusBtn} type="button" onClick={() => handleAddRoomOption()}>
          +
        </button>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
          <button
            className={s.addButton}
            type="button"
            onClick={() => {
              setShowAddRoom(false);
              setRoomInputs([{ name: '', count: 1 }]);
            }}
          >
            Отмена
          </button>
          <button className={s.addButton} type="submit">
            Сохранить
          </button>
        </div>
      </form>
    </>
  );
};
