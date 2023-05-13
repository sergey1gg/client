import axios from 'axios'
import { initializeSuccess } from '../reducers/appReducer';
import { setUser} from '../reducers/authReducer'
import { SERVER_IP } from '../config';
export const addUser = (username,phone,email,isAdmin,password)=>{
    return async dispatch =>{
    try{
        const response =await axios.post(`${SERVER_IP}/api/auth/adduser`,{username,phone,email,isAdmin,password})
        return response.data
    }
    catch(e){
        console.log(e.response.data.message)
    }
}
}
export const login =  (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${SERVER_IP}/api/auth/login`, {
                email,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export const auth =  () => {
    console.log(SERVER_IP)
    return async dispatch => {
        try {
            const response = await axios.get(`${SERVER_IP}/api/auth/authentification`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            console.log(e.response.data.message)
            localStorage.removeItem('token')
        }
    }
}
export const initializeApp = () => {
    return async dispatch => {
      try {
        let promise = dispatch(auth());
        Promise.all([promise]).then(() => {
          dispatch(initializeSuccess());
        });
      } catch (error) {
        alert(error)
      }
    };
  };

export const getUsers=()=>{
    return async dispatch=>{
        try {
            const response = await axios.get(`${SERVER_IP}/api/users/getuser`)
            return response.data
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}