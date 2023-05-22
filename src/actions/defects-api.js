import axios from 'axios'
import { setRooms } from '../reducers/actReducer'
import { SERVER_IP } from '../config'


export const addDefect=(actId,roomIndex,elementIndex,otdelkaIndex,name)=>{
    return async dispatch =>{
        try{                                 
            const response =await axios.post(`${SERVER_IP}/api/defect/setdefect/${actId}/${roomIndex}/${elementIndex}/${otdelkaIndex}`,{name})
            dispatch(setRooms(response.data));
            return response.data
        }
        catch(e){
            console.log(e.response.data.message)
        }
    }
}
export const deleteDefect=(actId,roomIndex,elementIndex,otdelkaIndex, defectIndex)=>{
    return async dispatch =>{
        try{                                 
            const response =await axios.post(`${SERVER_IP}/api/defect/deletedefect/${actId}/${roomIndex}/${elementIndex}/${otdelkaIndex}/${defectIndex}`)
            dispatch(setRooms(response.data));
            return response.data
        }
        catch(e){
            console.log(e.response.data.message)
        }
    }
}
export const editDefect=(actId,selectedRoom,elementIndex,otdelkaIndex,defectIndex,name)=>{
    return async dispatch =>{
        try{                                 
            const response =await axios.post(`${SERVER_IP}/api/defect/editdefect/${actId}/${selectedRoom}/${elementIndex}/${otdelkaIndex}/${defectIndex}`,{name})
            dispatch(setRooms(response.data))
            return response.data
        }
        catch(e){
            console.log(e.response.data.message)
        }
}
}

export const addNewDefect=(actId,roomIndex,elementIndex,name)=>{
    return async dispatch =>{
        try{                                 
            const response =await axios.post(`${SERVER_IP}/api/defect/setnewdefect/${actId}/${roomIndex}/${elementIndex}`,{name})
            dispatch(setRooms(response.data));
            return response.data
        }
        catch(e){
            console.log(e.response.data.message)
        }
    }
}
