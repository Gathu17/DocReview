import axios from 'axios';
import jwtDecode from 'jwt-decode'

const BASE_URL = "http://localhost:5000/users"

const TOKEN = localStorage.getItem('jwtToken')

if(localStorage.getItem('jwtToken')){
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken'))
    console.log(decodedToken)
    if(decodedToken.exp * 1000 < Date.now()){
        localStorage.removeItem('jwtToken')
        window.location.replace('/login')
        console.log('login')
    }
}

const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { authorization: `Bearer ${TOKEN}`},
})

export const getUser = async (id) => {
   try{
     const res = await userRequest.get(`/find/${id}`)
     console.log(res)
     return res;
   }catch(err){
     throw new Error('Error',err.response.data)
   }
}