import axios from 'axios'
import { setRooms } from '../reducers/actReducer'
import { SERVER_IP } from '../config'


export const addRoom=(actId,name)=>{
    return async dispatch =>{
        try{                                 
            const response =await axios.post(`${SERVER_IP}/api/act/setrooms/${actId}`,{name})
            dispatch(setRooms(response.data));
            return response.data
        }
        catch(e){
            console.log(e.response.data.message)
        }
}
}
export const deleteRoom=(actId,index)=>{
    return async dispatch =>{
        try{                                 
            const response =await axios.post(`${SERVER_IP}/api/act/deleteroom/${actId}`,{index})
            dispatch(setRooms(response.data))
            return response.data
        }
        catch(e){
            console.log(e.response.data.message)
        }
}
}
export const editRoom=(actId,index,name)=>{
    return async dispatch =>{
        try{                                 
            const response =await axios.post(`${SERVER_IP}/api/act/editroom/${actId}`,{index,name})
            dispatch(setRooms(response.data))
            return response.data
        }
        catch(e){
            console.log(e.response.data.message)
        }
}
}