import axios from 'axios'
import { setDirectory } from '../reducers/actReducer'
import { SERVER_IP } from '../config'



export const getDirectory = ()=>{
    return async dispatch =>{
    try{                                 
        const response =await axios.get(`${SERVER_IP}/api/directory/get`);
        dispatch(setDirectory(response.data))
    }
    catch(e){
        console.log(e.response.data.message)
    }
}
}

export const setNewDirectory = (data)=>{
    return async dispatch =>{
    try{                                 
        const response =await axios.post(`${SERVER_IP}/api/directory/set`,{data});
        dispatch(setDirectory(response.data))
    }
    catch(e){
        console.log(e.response.data.message)
    }
}
}
