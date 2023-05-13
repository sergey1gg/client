import axios from 'axios'
import { setRooms } from '../reducers/actReducer'
import { SERVER_IP } from '../config'

export const addSubDefect=(actId,roomIndex,elementIndex,otdelkaIndex,defectIndex,name)=>{
    return async dispatch =>{
        try{                                 
            const response =await axios.post(`${SERVER_IP}/api/subdefect/setsubdefect/${actId}/${roomIndex}/${elementIndex}/${otdelkaIndex}/${defectIndex}`,{name})
            dispatch(setRooms(response.data));
            return response.data
        }
        catch(e){
            console.log(e.response.data.message)
        }
    }
}
export const deleteSubDefect=(actId,roomIndex,elementIndex,otdelkaIndex,defectIndex, subDefectIndex)=>{
    return async dispatch =>{
        try{                                 
            const response =await axios.post(`${SERVER_IP}/api/subdefect/deletesubdefect/${actId}/${roomIndex}/${elementIndex}/${otdelkaIndex}/${defectIndex}/${subDefectIndex}`)
            dispatch(setRooms(response.data));
            return response.data
        }
        catch(e){
            console.log(e.response.data.message)
        }
    }
}
export const editSubDefect=(actId,selectedRoom,elementIndex,otdelkaIndex,defectIndex,subDefectIndex, name)=>{
    return async dispatch =>{
        try{                                 
            const response =await axios.post(`${SERVER_IP}/api/subdefect/editsubdefect/${actId}/${selectedRoom}/${elementIndex}/${otdelkaIndex}/${defectIndex}/${subDefectIndex}`,{name})
            dispatch(setRooms(response.data))
            return response.data
        }
        catch(e){
            console.log(e.response.data.message)
        }
}
}