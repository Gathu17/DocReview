import axios from 'axios';
import jwtDecode from 'jwt-decode'

const BASE_URL = "https://docreview-api.onrender.com"

//const TOKEN = localStorage.getItem('jwtToken')

 const authRequest = axios.create({
    baseURL: BASE_URL,
  });

export const addUser = async (user) => {
    try{
        const res = await authRequest.post("/auth/register",user)
        
        return res;
    }catch(err){
        throw Error(err.response.data);
    }
   
}
export const loginUser = async (user) => {
    try{
        const res = await authRequest.post("/auth/login",user)
        
        localStorage.setItem('jwtToken',res.data)
        const newUser = jwtDecode(res.data)
        return newUser;
    }catch(err){
        throw Error(err.response.data);
    }
   
}