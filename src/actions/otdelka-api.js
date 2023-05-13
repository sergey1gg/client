import axios from 'axios'
import { setRooms } from '../reducers/actReducer'
import { SERVER_IP } from '../config'


export const addOtdelka=(actId,roomIndex,elementIndex,name)=>{
    return async dispatch =>{
        try{                                 
            const response =await axios.post(`${SERVER_IP}/api/otdelka/setotdelka/${actId}/${roomIndex}/${elementIndex}`,{name})
            dispatch(setRooms(response.data));
            return response.data
        }
        catch(e){
            console.log(e.response.data.message)
        }
    }
}
export const deleteOtdelka=(actId,roomIndex,elementIndex,otdelkaIndex)=>{
    return async dispatch =>{
        try{                                 
            const response =await axios.post(`${SERVER_IP}/api/otdelka/deleteotdelka/${actId}/${roomIndex}/${elementIndex}/${otdelkaIndex}`)
            dispatch(setRooms(response.data));
            return response.data
        }
        catch(e){
            console.log(e.response.data.message)
        }
    }
}
export const editOtdelka=(actId,selectedRoom,elementIndex,otdelkaIndex,name)=>{
    return async dispatch =>{
        try{                                 
            const response =await axios.post(`${SERVER_IP}/api/otdelka/editotdelka/${actId}/${selectedRoom}/${elementIndex}/${otdelkaIndex}`,{name})
            dispatch(setRooms(response.data))
            return response.data
        }
        catch(e){
            console.log(e.response.data.message)
        }
}
}