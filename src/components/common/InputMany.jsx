import s from "../Act/Act.module.css"
export const InputMany = ({
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
    if (e.target.value === "Другое") {
      newRoomInputs[index].option = "Другое";
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
    setRoomInputs([...roomInputs, { name: "", count: 1 }]);
  };
let elementOptions
  if(selectedRoomName) {
  const selectedRoom = directory.find(room => room.name.toLowerCase() === selectedRoomName.toLowerCase());

// Получить названия элементов выбранной комнаты
 elementOptions = selectedRoom ? selectedRoom.options : [];
  }
  else{
    elementOptions=directory.map((p)=>(p.name))
  }
  console.log(elementOptions)
  return (
    <>
      <form onSubmit={handleAddRoom}>
        {roomInputs.map((input, index) => (
          <div
            key={index}
            style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}
          >
            {input.option ? (
              <span>{input.option}</span>
            ) : (
              <select value={input.name} onChange={(e) => handleRoomOptionChange(e, index)} style={{ padding: "8px", fontSize: '16px', marginBottom: '20px' }}>
                <option disabled value="">
                  Выберите название {index + 1}
                </option>
                {elementOptions.map((option, index) => (
                 <option key={index}>{option}</option>
                ))}
                <option>Другое</option>
              </select>
            )}
            {input.option === "Другое" && (
              <input
                className={s.mainInput}
                type="text"
                placeholder="Свое название"
                value={input.name}
                onChange={(e) => handleOptionInputChange(e, index)}
                required
              />
            )}

            <div className={s.btnForm}>
              <button
                className={s.plusBtn}
                type="button"
                onClick={() => handleRoomCountDecrement(index)}
              >
                -
              </button>
              <span>{input["count"]}</span>
              <button
                className={s.plusBtn}
                type="button"
                onClick={() => handleRoomCountIncrement(index)}
              >
                +
              </button>
            </div>

          </div>
        ))}
        <button className={s.plusBtn} type="button" onClick={() => handleAddRoomOption()}>
          +
        </button>
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
          <button className={s.addButton} type="button" onClick={() => {setShowAddRoom(false); setRoomInputs([{ name: '', count: 1 }])}}>
            Отмена
          </button>
          <button className={s.addButton} type="submit">
            Сохранить
          </button>
        </div>
      </form>
    </>
  );
}