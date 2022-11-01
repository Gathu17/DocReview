import axios from 'axios';
import jwtDecode from 'jwt-decode'


const BASE_URL = "https://docreview-api.onrender.com";
const TOKEN = localStorage.getItem('jwtToken')
console.log(TOKEN)



if(localStorage.getItem('jwtToken')){
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken'))
    if(decodedToken.exp * 1000 < Date.now()){
        localStorage.removeItem('jwtToken')
        window.location.replace('/login')

    }
}

const docRequest = axios.create({
    baseURL: BASE_URL,
    headers: { authorization: `Bearer ${localStorage.getItem('jwtToken')}`},
    
  });

export const getUserDoc = async () => {

    try{
        
        const res = await docRequest.get('/doc')
        console.log(res)
       
        return res
    }catch(error){
        throw new Error('Error',error.response.data)
       
    }
    

 }
export const createDoc  = async (doc) => {
    try{
        
        const res =  await docRequest.post('/doc',doc)
        console.log(res)
    }catch(error){
        throw new Error('Error',error)
    }
    
}
export const updateDoc = async ({id,doc}) => {
    try{
        console.log('updating..')
        const res =  await docRequest.put(`/doc/${id}`,doc)
        console.log(res)
        return res
    }catch(error){
        throw new Error('Error',error.response.data)
    }
}
export const addDoc = async (doc) => {
    try{
        
        const res =  await docRequest.patch('/doc',doc)
        console.log(res)
        return res
    }catch(error){
        throw new Error('Error',error.response.data)
    }
}

export const getDocs = async () => {
    
    try{
        
        const res = await docRequest.get('/doc/review')
        
        return res
    }catch(error){
        throw new Error('Error',error.response.data)
    
    }
}

export const deleteFile = async (id) => {
    try{
       const res = await docRequest.delete(`/doc/single/${id}`)
       return res
    }catch(error){
        throw new Error('Error',error.response.data.message)
    }
}

export const deleteDoc = async (id) => {
    try{
       const res = await docRequest.delete(`/doc/${id}`)
       console.log(res.data)
       return res
    }catch(error){
        throw new Error('Error',error.response.data.message)
    }
}