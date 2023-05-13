import s from "../Act/Act.module.css"
export const InputSubDefect = ({
  handleAddRoom,
  setRoomInputs,
  setShowAddRoom,
  roomInputs,
  directory,
  selectedDefectName,
}) => {
  console.log(selectedDefectName)
    const handleRoomOptionChange = (e, index) => {
        const newRoomInputs = [...roomInputs];
        if (e.target.value === "Другое") {
          newRoomInputs[index].option = "Другое";
          setRoomInputs(newRoomInputs);
        } else {
            const updatedInputs = [...roomInputs];
          updatedInputs[index] = {
            name: e.target.value,
            comment: newRoomInputs[index].comment,
            count: 1,
          };
          setRoomInputs(updatedInputs);
        }
      };
      
      const handleCommentOptionChange = (e, index) => {
        const newRoomInputs = [...roomInputs];
        if (e.target.value === "Другой") {
          newRoomInputs[index].option2 = "Другой";
          setRoomInputs(newRoomInputs);
        } else {
          const updatedInputs = [...roomInputs];
          updatedInputs[index] = {
            name: newRoomInputs[index].name,
            comment: e.target.value,
            count: 1
          };
          setRoomInputs(updatedInputs);
        }
      };
      
      const handleOptionInputChange = (e, index) => {
        const newRoomInputs = [...roomInputs];
        newRoomInputs[index].name = e.target.value;
        setRoomInputs(newRoomInputs);
      };
      
      const handleCommentInputChange = (e, index) => {
        const newRoomInputs = [...roomInputs];
        newRoomInputs[index].comment = e.target.value;
        setRoomInputs(newRoomInputs);
      };
      
      const handleAddRoomOption = () => {
        setRoomInputs([
          ...roomInputs,
          { name: "", comment: "", count: 1, option: "", option2: "" },
        ]);
      };
      const selectedRoom = directory.defects.find(room => room.name.toLowerCase() === selectedDefectName.toLowerCase());
      // Получить названия элементов выбранной комнаты
      const elementOptions = selectedRoom ? selectedRoom.options : [];
      console.log(elementOptions);
 
      return (
        <>
          <form onSubmit={handleAddRoom}>
            {roomInputs.map((input, index) => (
               <div
               key={index}
               style={{
                 display: "flex",
                 alignItems: "baseline",
                 justifyContent: "space-between",
               }}
             >
               {input.option ? (
                 <span>{input.option}</span>
               ) : (
                 <select
                   value={input.name}
                   onChange={(e) => handleRoomOptionChange(e, index)}
                   style={{
                     padding: "5px",
                     fontSize: "14px",
                     marginBottom: "20px",
                   }}
                 >
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
   
   <SecondInput
              value={input}
              onChange={(e) => handleCommentOptionChange(e, index)}
              directory={directory}
            />
             </div>
           ))}
            <button className={s.plusBtn} type="button" onClick={() => handleAddRoomOption()}>
              +
            </button>
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
              <button className={s.addButton} type="button"onClick={() => {setShowAddRoom(false); setRoomInputs([{ name: '',comment: '', count: 1 }])}}>
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

    const SecondInput = ({ value, onChange,directory }) => {
      const selectedRoom = directory.subdefects.find(room => room.name.toLowerCase() === value.name?.toLowerCase());
      // Получить названия элементов выбранной комнаты
      const elementOptions = selectedRoom ? selectedRoom.options : [];
      console.log(elementOptions);
      return (
        <>
          {value.option2 ? (
            <span>{value.option2}</span>
          ) : (
            <select
              value={value.comment}
              onChange={onChange}
              style={{
                padding: "5px",
                fontSize: "14px",
                marginBottom: "20px",
                width: '150px'
              }}
            >
              <option disabled value="">
                Выберите Комментарий
              </option>
              {elementOptions.map((option, index) => (
                 <option key={index}>{option}</option>
                ))}
              <option>Другой</option>
            </select>
          )}
          {value.option2 === "Другой" && (
            <input
              className={s.mainInput}
              type="text"
              placeholder="Свой коммент"
              value={value.comment}
              onChange={onChange}
              required
            />
          )}
        </>
      );
    };