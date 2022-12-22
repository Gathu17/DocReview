import axios from 'axios';

const BASE_URL = "https://docreview-api.onrender.com/comments"

const TOKEN = localStorage.getItem('jwtToken')

const commentRequest = axios.create({
    baseURL: BASE_URL,
    headers: { authorization: `Bearer ${TOKEN}`, "Content-type": "application/json"},
    
  });

export const addComment = async ({id,comments}) => {
    try{
        console.log(JSON.stringify({comments}),id)
        const res = await commentRequest.patch(`/${id}`, JSON.stringify({comments}))
        return res 
    }catch(error){
        throw new Error('Error',error.response.data)
    }
}
export const deleteComment = async ({docId,commentId}) => {
    try{
        
        const res = await commentRequest.delete(`/id?docId=${docId}&commentId=${commentId}`)
        return res
    }catch(error){
        throw new Error('Error',error.response.data.message)
    }
}