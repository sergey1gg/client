import axios from 'axios'
import { setRooms } from '../reducers/actReducer'
import { SERVER_IP } from '../config'

export const addAct = (number, FIO, address, category, checkdate)=>{
    return async dispatch =>{
    try{                                 
        const response =await axios.post(`${SERVER_IP}/api/act/newact`, {number, FIO, address, category, checkdate},
        {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
        )
        debugger
        return response.data
    }
    catch(e){
        console.log(e.response.data.message)
    }
}
}

export const getAllAct = ()=>{
    return async dispatch =>{
    try{                                 
        const response =await axios.get(`${SERVER_IP}/api/act/getallact`)
        return response.data
    }
    catch(e){
        console.log(e.response.data.message)
    }
}
}
export const getCurrentAct=(actId)=>{
    return async dispatch =>{
        try{                                 
            const response =await axios.get(`${SERVER_IP}/api/act/rooms/${actId}`)

            dispatch(setRooms(response.data))
        
            return response.data
        }
        catch(e){
            console.log(e.response.data.message)
        }
}
}

export const copyAct=(actId)=>{
    return async dispatch =>{
        try{                                 
            const response =await axios.post(`${SERVER_IP}/api/act/copyact/${actId}`)
            return response.data
        }
        catch(e){
            console.log(e.response.data.message)
        }
}
}
export const deleteAct=(actId)=>{
    return async dispatch =>{
        try{                                 
            const response =await axios.post(`${SERVER_IP}/api/act/deleteact/${actId}`)
            return response.data
        }
        catch(e){
            console.log(e.response.data.message)
        }
}
}