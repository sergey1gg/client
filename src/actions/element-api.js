import axios from 'axios'
import { setRooms } from '../reducers/actReducer'
import { SERVER_IP } from '../config'


export const addElement=(actId,roomIndex,name)=>{
    return async dispatch =>{
        try{                                 
            const response =await axios.post(`${SERVER_IP}/api/elements/setelements/${actId}/${roomIndex}`,{name})
            dispatch(setRooms(response.data));
            return response.data
        }
        catch(e){
            console.log(e.response.data.message)
        }
    }
}
export const deleteElement=(actId,roomIndex,elementIndex)=>{
    return async dispatch =>{
        try{                                 
            const response =await axios.post(`${SERVER_IP}/api/elements/deleteelement/${actId}/${roomIndex}/${elementIndex}`)
            dispatch(setRooms(response.data));
            return response.data
        }
        catch(e){
            console.log(e.response.data.message)
        }
    }
}
export const editElement=(actId,selectedRoom,index,name)=>{
    return async dispatch =>{
        try{                                 
            const response =await axios.post(`${SERVER_IP}/api/elements/editelement/${actId}/${selectedRoom}/${index}`,{name})
            dispatch(setRooms(response.data))
            return response.data
        }
        catch(e){
            console.log(e.response.data.message)
        }
}
}